<?php
$pageTitle = "Afegir projecte — Gestor de Tasques";
require "config.php";

$error = '';
$users = mysqli_query($conn, "SELECT user_id, full_name FROM users ORDER BY full_name");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name        = trim($_POST['project_name'] ?? '');
    $description = trim($_POST['project_description'] ?? '');
    $lead        = (int)($_POST['lead_user_id'] ?? 0);

    if (!$name || !$description || !$lead) {
        $error = 'Tots els camps són obligatoris.';
    } else {
        $sql = "INSERT INTO projects (project_name, project_description, lead_user_id)
                VALUES ('".mysqli_real_escape_string($conn,$name)."',
                        '".mysqli_real_escape_string($conn,$description)."',
                        $lead)";
        if (mysqli_query($conn, $sql)) {
            header("Location: projectes.php?msg=added");
            exit;
        } else {
            $error = 'Error: ' . mysqli_error($conn);
        }
    }
}
require "_header.php";
?>

<div class="page-header">
    <h1>📁 Afegir projecte</h1>
    <a href="projectes.php" class="btn btn-secondary">← Tornar</a>
</div>

<?php if ($error): echo "<div class='alert alert-error'>$error</div>"; endif; ?>

<div class="form-card">
<form method="POST">
    <div class="form-group">
        <label>Nom del projecte</label>
        <input type="text" name="project_name" maxlength="20"
               value="<?= htmlspecialchars($_POST['project_name'] ?? '') ?>" required>
    </div>
    <div class="form-group">
        <label>Descripció</label>
        <textarea name="project_description" maxlength="200" required><?= htmlspecialchars($_POST['project_description'] ?? '') ?></textarea>
    </div>
    <div class="form-group">
        <label>Responsable</label>
        <select name="lead_user_id" required>
            <option value="">— Selecciona un usuari —</option>
            <?php
            mysqli_data_seek($users, 0);
            while ($u = mysqli_fetch_assoc($users)):
            $sel = ($_POST['lead_user_id'] ?? '') == $u['user_id'] ? 'selected' : '';
            ?>
            <option value="<?= $u['user_id'] ?>" <?= $sel ?>><?= htmlspecialchars($u['full_name']) ?></option>
            <?php endwhile; ?>
        </select>
    </div>
    <div class="form-actions">
        <button type="submit" class="btn btn-success">Afegir</button>
        <a href="projectes.php" class="btn btn-secondary">Cancel·lar</a>
    </div>
</form>
</div>

<?php require "_footer.php"; ?>
