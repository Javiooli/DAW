<?php
$pageTitle = "Tasques — Gestor de Tasques";
require "config.php";
require "_header.php";

$msg = $_GET['msg'] ?? '';
$result = mysqli_query($conn,
    "SELECT t.*, u.full_name AS assignee_name, p.project_name, tt.task_type_name
     FROM tasks t
     LEFT JOIN users u ON t.user_id = u.user_id
     LEFT JOIN projects p ON t.project_id = p.project_id
     LEFT JOIN task_types tt ON t.task_type = tt.task_type_id
     ORDER BY t.task_id");
?>

<div class="page-header">
    <h1>✅ Tasques</h1>
    <a href="tasques_add.php" class="btn btn-success">+ Afegir tasca</a>
</div>

<?php if ($msg === 'added'):   echo '<div class="alert alert-success">Tasca afegida correctament.</div>'; endif; ?>
<?php if ($msg === 'edited'):  echo '<div class="alert alert-success">Tasca actualitzada correctament.</div>'; endif; ?>
<?php if ($msg === 'deleted'): echo '<div class="alert alert-success">Tasca eliminada correctament.</div>'; endif; ?>

<table>
    <thead>
        <tr>
            <th>#</th><th>Resum</th><th>Projecte</th><th>Tipus</th>
            <th>Estat</th><th>Assignat a</th><th>Completat</th><th>Accions</th>
        </tr>
    </thead>
    <tbody>
        <?php while ($row = mysqli_fetch_assoc($result)): ?>
        <tr>
            <td><?= $row['task_id'] ?></td>
            <td><strong><?= htmlspecialchars($row['summary']) ?></strong></td>
            <td><?= htmlspecialchars($row['project_name'] ?? '—') ?></td>
            <td><span class="badge badge-blue"><?= htmlspecialchars($row['task_type_name'] ?? '—') ?></span></td>
            <td>
                <?php
                $status_cls = match($row['status']) {
                    'In progress'     => 'badge-orange',
                    'To be assigned'  => 'badge-grey',
                    'On hold'         => 'badge-red',
                    default           => 'badge-green'
                };
                echo "<span class='badge $status_cls'>" . htmlspecialchars($row['status']) . "</span>";
                ?>
            </td>
            <td><?= htmlspecialchars($row['assignee_name'] ?? '—') ?></td>
            <td><?= $row['completed'] ? '✅' : '❌' ?></td>
            <td class="actions">
                <a href="tasques_edit.php?id=<?= $row['task_id'] ?>" class="btn btn-warning btn-sm">Editar</a>
                <a href="tasques_delete.php?id=<?= $row['task_id'] ?>" class="btn btn-danger btn-sm">Esborrar</a>
            </td>
        </tr>
        <?php endwhile; ?>
    </tbody>
</table>

<?php require "_footer.php"; ?>
