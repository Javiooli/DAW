<?php
$pageTitle = "Projectes — Gestor de Tasques";
require "config.php";
require "_header.php";

$msg = $_GET['msg'] ?? '';
$result = mysqli_query($conn,
    "SELECT p.*, u.full_name AS lead_name
     FROM projects p
     LEFT JOIN users u ON p.lead_user_id = u.user_id
     ORDER BY p.project_id");
?>

<div class="page-header">
    <h1>📁 Projectes</h1>
    <a href="projectes_add.php" class="btn btn-success">+ Afegir projecte</a>
</div>

<?php if ($msg === 'added'):   echo '<div class="alert alert-success">Projecte afegit correctament.</div>'; endif; ?>
<?php if ($msg === 'edited'):  echo '<div class="alert alert-success">Projecte actualitzat correctament.</div>'; endif; ?>
<?php if ($msg === 'deleted'): echo '<div class="alert alert-success">Projecte eliminat correctament.</div>'; endif; ?>

<table>
    <thead>
        <tr>
            <th>#</th><th>Nom</th><th>Descripció</th><th>Responsable</th><th>Accions</th>
        </tr>
    </thead>
    <tbody>
        <?php while ($row = mysqli_fetch_assoc($result)): ?>
        <tr>
            <td><?= $row['project_id'] ?></td>
            <td><strong><?= htmlspecialchars($row['project_name']) ?></strong></td>
            <td><?= htmlspecialchars($row['project_description']) ?></td>
            <td><?= htmlspecialchars($row['lead_name'] ?? '—') ?></td>
            <td class="actions">
                <a href="projectes_edit.php?id=<?= $row['project_id'] ?>" class="btn btn-warning btn-sm">Editar</a>
                <a href="projectes_delete.php?id=<?= $row['project_id'] ?>" class="btn btn-danger btn-sm">Esborrar</a>
            </td>
        </tr>
        <?php endwhile; ?>
    </tbody>
</table>

<?php require "_footer.php"; ?>
