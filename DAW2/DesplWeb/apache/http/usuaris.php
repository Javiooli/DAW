<?php
$pageTitle = "Usuaris — Gestor de Tasques";
require "config.php";
require "_header.php";

$msg = $_GET['msg'] ?? '';
$result = mysqli_query($conn, "SELECT * FROM users ORDER BY user_id");
?>

<div class="page-header">
    <h1>👥 Usuaris</h1>
    <a href="usuaris_add.php" class="btn btn-success">+ Afegir usuari</a>
</div>

<?php if ($msg === 'added'):   echo '<div class="alert alert-success">Usuari afegit correctament.</div>'; endif; ?>
<?php if ($msg === 'edited'):  echo '<div class="alert alert-success">Usuari actualitzat correctament.</div>'; endif; ?>
<?php if ($msg === 'deleted'): echo '<div class="alert alert-success">Usuari eliminat correctament.</div>'; endif; ?>

<table>
    <thead>
        <tr>
            <th>#</th><th>Nom d'usuari</th><th>Nom complet</th><th>Nivell de permisos</th><th>Accions</th>
        </tr>
    </thead>
    <tbody>
        <?php while ($row = mysqli_fetch_assoc($result)): ?>
        <tr>
            <td><?= $row['user_id'] ?></td>
            <td><?= htmlspecialchars($row['username']) ?></td>
            <td><?= htmlspecialchars($row['full_name']) ?></td>
            <td>
                <?php
                $lvl = (int)$row['permission_level'];
                $labels = [1 => ['Usuari','badge-blue'], 2 => ['Manager','badge-orange'], 3 => ['Admin','badge-red']];
                [$label, $cls] = $labels[$lvl] ?? [(string)$lvl, 'badge-grey'];
                echo "<span class='badge $cls'>$label</span>";
                ?>
            </td>
            <td class="actions">
                <a href="usuaris_edit.php?id=<?= $row['user_id'] ?>" class="btn btn-warning btn-sm">Editar</a>
                <a href="usuaris_delete.php?id=<?= $row['user_id'] ?>" class="btn btn-danger btn-sm">Esborrar</a>
            </td>
        </tr>
        <?php endwhile; ?>
    </tbody>
</table>

<?php require "_footer.php"; ?>
