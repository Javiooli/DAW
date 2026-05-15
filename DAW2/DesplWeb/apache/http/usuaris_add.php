<?php
$pageTitle = "Afegir usuari — Gestor de Tasques";
require "config.php";

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username   = trim($_POST['username'] ?? '');
    $full_name  = trim($_POST['full_name'] ?? '');
    $password   = trim($_POST['password'] ?? '');
    $permission = (int)($_POST['permission_level'] ?? 1);

    if (!$username || !$full_name || !$password) {
        $error = 'Tots els camps són obligatoris.';
    } else {
        $sql = "INSERT INTO users (username, full_name, password, permission_level)
                VALUES ('".mysqli_real_escape_string($conn,$username)."',
                        '".mysqli_real_escape_string($conn,$full_name)."',
                        '".mysqli_real_escape_string($conn,$password)."',
                        $permission)";
        if (mysqli_query($conn, $sql)) {
            header("Location: usuaris.php?msg=added");
            exit;
        } else {
            $error = 'Error en afegir l\'usuari: ' . mysqli_error($conn);
        }
    }
}
require "_header.php";
?>

<div class="page-header">
    <h1>👥 Afegir usuari</h1>
    <a href="usuaris.php" class="btn btn-secondary">← Tornar</a>
</div>

<?php if ($error): echo "<div class='alert alert-error'>$error</div>"; endif; ?>

<div class="form-card">
<form method="POST">
    <div class="form-group">
        <label>Nom d'usuari</label>
        <input type="text" name="username" value="<?= htmlspecialchars($_POST['username'] ?? '') ?>" required>
    </div>
    <div class="form-group">
        <label>Nom complet</label>
        <input type="text" name="full_name" value="<?= htmlspecialchars($_POST['full_name'] ?? '') ?>" required>
    </div>
    <div class="form-group">
        <label>Contrasenya</label>
        <input type="text" name="password" value="<?= htmlspecialchars($_POST['password'] ?? '') ?>" required>
    </div>
    <div class="form-group">
        <label>Nivell de permisos</label>
        <select name="permission_level">
            <option value="1" <?= ($_POST['permission_level'] ?? 1) == 1 ? 'selected' : '' ?>>1 — Usuari</option>
            <option value="2" <?= ($_POST['permission_level'] ?? 1) == 2 ? 'selected' : '' ?>>2 — Manager</option>
            <option value="3" <?= ($_POST['permission_level'] ?? 1) == 3 ? 'selected' : '' ?>>3 — Admin</option>
        </select>
    </div>
    <div class="form-actions">
        <button type="submit" class="btn btn-success">Afegir</button>
        <a href="usuaris.php" class="btn btn-secondary">Cancel·lar</a>
    </div>
</form>
</div>

<?php require "_footer.php"; ?>
