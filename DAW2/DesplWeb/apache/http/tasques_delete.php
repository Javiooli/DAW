<?php
$pageTitle = "Esborrar tasca — Gestor de Tasques";
require "config.php";

$id = (int)($_GET['id'] ?? 0);
if (!$id) { header("Location: tasques.php"); exit; }

$row = mysqli_fetch_assoc(mysqli_query($conn, "SELECT * FROM tasks WHERE task_id=$id"));
if (!$row) { header("Location: tasques.php"); exit; }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    mysqli_query($conn, "DELETE FROM effort WHERE task_id=$id");
    if (mysqli_query($conn, "DELETE FROM tasks WHERE task_id=$id")) {
        header("Location: tasques.php?msg=deleted");
        exit;
    }
}
require "_header.php";
?>

<div class="page-header">
    <h1>✅ Esborrar tasca</h1>
    <a href="tasques.php" class="btn btn-secondary">← Tornar</a>
</div>

<div class="confirm-box">
    <p>Estàs a punt d'esborrar la tasca <strong><?= htmlspecialchars($row['summary']) ?></strong>.</p>
    <p>Aquesta acció no es pot desfer.</p>
    <form method="POST">
        <div class="form-actions">
            <button type="submit" class="btn btn-danger">Sí, esborrar</button>
            <a href="tasques.php" class="btn btn-secondary">Cancel·lar</a>
        </div>
    </form>
</div>

<?php require "_footer.php"; ?>
