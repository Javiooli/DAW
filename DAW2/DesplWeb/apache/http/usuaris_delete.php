<?php
$pageTitle = "Esborrar usuari — Gestor de Tasques";
require "config.php";

$id = (int)($_GET['id'] ?? 0);
if (!$id) { header("Location: usuaris.php"); exit; }

$row = mysqli_fetch_assoc(mysqli_query($conn, "SELECT * FROM users WHERE user_id=$id"));
if (!$row) { header("Location: usuaris.php"); exit; }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Desassignar tasques de l'usuari abans d'esborrar
    mysqli_query($conn, "UPDATE tasks SET user_id=NULL WHERE user_id=$id");
    mysqli_query($conn, "DELETE FROM effort WHERE user_id=$id");
    if (mysqli_query($conn, "DELETE FROM users WHERE user_id=$id")) {
        header("Location: usuaris.php?msg=deleted");
        exit;
    }
}
require "_header.php";
?>

<div class="page-header">
    <h1>👥 Esborrar usuari</h1>
    <a href="usuaris.php" class="btn btn-secondary">← Tornar</a>
</div>

<div class="confirm-box">
    <p>Estàs a punt d'esborrar l'usuari <strong><?= htmlspecialchars($row['full_name']) ?></strong>
    (<?= htmlspecialchars($row['username']) ?>).</p>
    <p>Les tasques assignades a aquest usuari quedaran sense assignar. Aquesta acció no es pot desfer.</p>
    <form method="POST">
        <div class="form-actions">
            <button type="submit" class="btn btn-danger">Sí, esborrar</button>
            <a href="usuaris.php" class="btn btn-secondary">Cancel·lar</a>
        </div>
    </form>
</div>

<?php require "_footer.php"; ?>
