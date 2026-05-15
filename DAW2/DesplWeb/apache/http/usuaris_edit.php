<?php
$pageTitle = "Editar usuari — Gestor de Tasques";
require "config.php";

$id = (int)($_GET['id'] ?? 0);
if (!$id) { header("Location: usuaris.php"); exit; }

$row = mysqli_fetch_assoc(mysqli_query($conn, "SELECT * FROM users WHERE user_id=$id"));
if (!$row) { header("Location: usuaris.php"); exit; }

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username   = trim($_POST['username'] ?? '');
    $full_name  = trim($_POST['full_name'] ?? '');
    $password   = trim($_POST['password'] ?? '');
    $permission = (int)($_POST['permission_level'] ?? 1);

    if (!$username || !$full_name || !$password) {
        $error = 'Tots els camps són obligatoris.';
    } else {
        $sql = "UPDATE users SET
                    username='".mysqli_real_escape_string($conn,$username)."',
                    full_name='".mysqli_real_escape_string($conn,$full_name)."',
                    password='".mysqli_real_escape_string($conn,$password)."',
                    permission_level=$permission
                WHERE user_id=$id";
        if (mysqli_query($conn, $sql)) {
            header("Location: usuaris.php?msg=edited");
            exit;
        } else {
            $error = 'Error en actualitzar: ' . mysqli_error($conn);
        }
    }
    $row['username']         = $_POST['username'];
    $row['full_name']        = $_POST['full_name'];
    $row['password']         = $_POST['password'];
    $row['permission_level'] = $_POST['permission_level'];
}
require "_header.php";
?>

<div class="page-header">
    <h1>👥 Editar usuari #<?= $id ?></h1>
    <a href="usuaris.php" class="btn btn-secondary">← Tornar</a>
</div>

<?php if ($error): echo "<div class='alert alert-error'>$error</div>"; endif; ?>

<div class="form-card">
<form method="POST">
    <div class="form-group">
        <label>Nom d'usuari</label>
        <input type="text" name="username" value="<?= htmlspecialchars($row['username']) ?>" required>
    </div>
    <div class="form-group">
        <label>Nom complet</label>
        <input type="text" name="full_name" value="<?= htmlspecialchars($row['full_name']) ?>" required>
    </div>
    <div class="form-group">
        <label>Contrasenya</label>
        <input type="text" name="password" value="<?= htmlspecialchars($row['password']) ?>" required>
    </div>
    <div class="form-group">
        <label>Nivell de permisos</label>
        <select name="permission_level">
            <option value="1" <?= $row['permission_level'] == 1 ? 'selected' : '' ?>>1 — Usuari</option>
            <option value="2" <?= $row['permission_level'] == 2 ? 'selected' : '' ?>>2 — Manager</option>
            <option value="3" <?= $row['permission_level'] == 3 ? 'selected' : '' ?>>3 — Admin</option>
        </select>
    </div>
    <div class="form-actions">
        <button type="submit" class="btn btn-warning">Desar canvis</button>
        <a href="usuaris.php" class="btn btn-secondary">Cancel·lar</a>
    </div>
</form>
</div>

<?php require "_footer.php"; ?>
