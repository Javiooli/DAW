<?php
$pageTitle = "Editar projecte — Gestor de Tasques";
require "config.php";

$id = (int)($_GET['id'] ?? 0);
if (!$id) { header("Location: projectes.php"); exit; }

$row = mysqli_fetch_assoc(mysqli_query($conn, "SELECT * FROM projects WHERE project_id=$id"));
if (!$row) { header("Location: projectes.php"); exit; }

$users = mysqli_query($conn, "SELECT user_id, full_name FROM users ORDER BY full_name");
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name        = trim($_POST['project_name'] ?? '');
    $description = trim($_POST['project_description'] ?? '');
    $lead        = (int)($_POST['lead_user_id'] ?? 0);

    if (!$name || !$description || !$lead) {
        $error = 'Tots els camps són obligatoris.';
    } else {
        $sql = "UPDATE projects SET
                    project_name='".mysqli_real_escape_string($conn,$name)."',
                    project_description='".mysqli_real_escape_string($conn,$description)."',
                    lead_user_id=$lead
                WHERE project_id=$id";
        if (mysqli_query($conn, $sql)) {
            header("Location: projectes.php?msg=edited");
            exit;
        } else {
            $error = 'Error: ' . mysqli_error($conn);
        }
    }
    $row['project_name']        = $_POST['project_name'];
    $row['project_description'] = $_POST['project_description'];
    $row['lead_user_id']        = $_POST['lead_user_id'];
}
require "_header.php";
?>

<div class="page-header">
    <h1>📁 Editar projecte #<?= $id ?></h1>
    <a href="projectes.php" class="btn btn-secondary">← Tornar</a>
</div>

<?php if ($error): echo "<div class='alert alert-error'>$error</div>"; endif; ?>

<div class="form-card">
<form method="POST">
    <div class="form-group">
        <label>Nom del projecte</label>
        <input type="text" name="project_name" maxlength="20"
               value="<?= htmlspecialchars($row['project_name']) ?>" required>
    </div>
    <div class="form-group">
        <label>Descripció</label>
        <textarea name="project_description" maxlength="200" required><?= htmlspecialchars($row['project_description']) ?></textarea>
    </div>
    <div class="form-group">
        <label>Responsable</label>
        <select name="lead_user_id" required>
            <?php while ($u = mysqli_fetch_assoc($users)): $sel = $row['lead_user_id'] == $u['user_id'] ? 'selected' : ''; ?>
            <option value="<?= $u['user_id'] ?>" <?= $sel ?>><?= htmlspecialchars($u['full_name']) ?></option>
            <?php endwhile; ?>
        </select>
    </div>
    <div class="form-actions">
        <button type="submit" class="btn btn-warning">Desar canvis</button>
        <a href="projectes.php" class="btn btn-secondary">Cancel·lar</a>
    </div>
</form>
</div>

<?php require "_footer.php"; ?>
