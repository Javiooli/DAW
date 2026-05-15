<?php
$pageTitle = "Esborrar projecte — Gestor de Tasques";
require "config.php";

$id = (int)($_GET['id'] ?? 0);
if (!$id) { header("Location: projectes.php"); exit; }

$row = mysqli_fetch_assoc(mysqli_query($conn, "SELECT * FROM projects WHERE project_id=$id"));
if (!$row) { header("Location: projectes.php"); exit; }

$task_count = mysqli_fetch_assoc(mysqli_query($conn,
    "SELECT COUNT(*) AS n FROM tasks WHERE project_id=$id"))['n'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Esborrar esforços i tasques associades primer
    $task_ids_res = mysqli_query($conn, "SELECT task_id FROM tasks WHERE project_id=$id");
    while ($t = mysqli_fetch_assoc($task_ids_res)) {
        mysqli_query($conn, "DELETE FROM effort WHERE task_id={$t['task_id']}");
    }
    mysqli_query($conn, "DELETE FROM tasks WHERE project_id=$id");
    if (mysqli_query($conn, "DELETE FROM projects WHERE project_id=$id")) {
        header("Location: projectes.php?msg=deleted");
        exit;
    }
}
require "_header.php";
?>

<div class="page-header">
    <h1>📁 Esborrar projecte</h1>
    <a href="projectes.php" class="btn btn-secondary">← Tornar</a>
</div>

<div class="confirm-box">
    <p>Estàs a punt d'esborrar el projecte <strong><?= htmlspecialchars($row['project_name']) ?></strong>.</p>
    <?php if ($task_count > 0): ?>
    <p>⚠️ Aquest projecte té <strong><?= $task_count ?> tasques</strong> associades que també s'esborraran.</p>
    <?php endif; ?>
    <p>Aquesta acció no es pot desfer.</p>
    <form method="POST">
        <div class="form-actions">
            <button type="submit" class="btn btn-danger">Sí, esborrar</button>
            <a href="projectes.php" class="btn btn-secondary">Cancel·lar</a>
        </div>
    </form>
</div>

<?php require "_footer.php"; ?>
