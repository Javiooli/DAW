<?php
$pageTitle = "Editar tasca — Gestor de Tasques";
require "config.php";

$id = (int)($_GET['id'] ?? 0);
if (!$id) { header("Location: tasques.php"); exit; }

$row = mysqli_fetch_assoc(mysqli_query($conn, "SELECT * FROM tasks WHERE task_id=$id"));
if (!$row) { header("Location: tasques.php"); exit; }

$users    = mysqli_query($conn, "SELECT user_id, full_name FROM users ORDER BY full_name");
$projects = mysqli_query($conn, "SELECT project_id, project_name FROM projects ORDER BY project_name");
$types    = mysqli_query($conn, "SELECT task_type_id, task_type_name FROM task_types ORDER BY task_type_name");
$statuses = ['To be assigned', 'In progress', 'On hold', 'Completed'];

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $summary     = trim($_POST['summary'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $project_id  = (int)($_POST['project_id'] ?? 0);
    $task_type   = (int)($_POST['task_type'] ?? 0);
    $status      = $_POST['status'] ?? 'To be assigned';
    $user_id     = (int)($_POST['user_id'] ?? 0) ?: 'NULL';
    $completed   = isset($_POST['completed']) ? 1 : 0;

    if (!$summary || !$description || !$project_id || !$task_type) {
        $error = 'Els camps Resum, Descripció, Projecte i Tipus són obligatoris.';
    } else {
        $sql = "UPDATE tasks SET
                    summary='".mysqli_real_escape_string($conn,$summary)."',
                    description='".mysqli_real_escape_string($conn,$description)."',
                    project_id=$project_id,
                    task_type=$task_type,
                    status='".mysqli_real_escape_string($conn,$status)."',
                    user_id=$user_id,
                    completed=$completed
                WHERE task_id=$id";
        if (mysqli_query($conn, $sql)) {
            header("Location: tasques.php?msg=edited");
            exit;
        } else {
            $error = 'Error: ' . mysqli_error($conn);
        }
    }
    $row = array_merge($row, $_POST);
    $row['completed'] = isset($_POST['completed']) ? 1 : 0;
}
require "_header.php";
?>

<div class="page-header">
    <h1>✅ Editar tasca #<?= $id ?></h1>
    <a href="tasques.php" class="btn btn-secondary">← Tornar</a>
</div>

<?php if ($error): echo "<div class='alert alert-error'>$error</div>"; endif; ?>

<div class="form-card">
<form method="POST">
    <div class="form-group">
        <label>Resum</label>
        <input type="text" name="summary" maxlength="50"
               value="<?= htmlspecialchars($row['summary']) ?>" required>
    </div>
    <div class="form-group">
        <label>Descripció</label>
        <textarea name="description" maxlength="200" required><?= htmlspecialchars($row['description']) ?></textarea>
    </div>
    <div class="form-group">
        <label>Projecte</label>
        <select name="project_id" required>
            <?php while ($p = mysqli_fetch_assoc($projects)): $sel = $row['project_id'] == $p['project_id'] ? 'selected' : ''; ?>
            <option value="<?= $p['project_id'] ?>" <?= $sel ?>><?= htmlspecialchars($p['project_name']) ?></option>
            <?php endwhile; ?>
        </select>
    </div>
    <div class="form-group">
        <label>Tipus de tasca</label>
        <select name="task_type" required>
            <?php while ($tt = mysqli_fetch_assoc($types)): $sel = $row['task_type'] == $tt['task_type_id'] ? 'selected' : ''; ?>
            <option value="<?= $tt['task_type_id'] ?>" <?= $sel ?>><?= htmlspecialchars($tt['task_type_name']) ?></option>
            <?php endwhile; ?>
        </select>
    </div>
    <div class="form-group">
        <label>Estat</label>
        <select name="status">
            <?php foreach ($statuses as $s): $sel = $row['status'] === $s ? 'selected' : ''; ?>
            <option value="<?= $s ?>" <?= $sel ?>><?= $s ?></option>
            <?php endforeach; ?>
        </select>
    </div>
    <div class="form-group">
        <label>Assignat a</label>
        <select name="user_id">
            <option value="">— Sense assignar —</option>
            <?php while ($u = mysqli_fetch_assoc($users)): $sel = $row['user_id'] == $u['user_id'] ? 'selected' : ''; ?>
            <option value="<?= $u['user_id'] ?>" <?= $sel ?>><?= htmlspecialchars($u['full_name']) ?></option>
            <?php endwhile; ?>
        </select>
    </div>
    <div class="form-group">
        <label><input type="checkbox" name="completed" <?= $row['completed'] ? 'checked' : '' ?>> Completada</label>
    </div>
    <div class="form-actions">
        <button type="submit" class="btn btn-warning">Desar canvis</button>
        <a href="tasques.php" class="btn btn-secondary">Cancel·lar</a>
    </div>
</form>
</div>

<?php require "_footer.php"; ?>
