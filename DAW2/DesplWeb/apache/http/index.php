<?php $pageTitle = "Inici — Gestor de Tasques"; ?>
<?php require "_header.php"; ?>

<div class="page-header">
    <h1>Benvingut al Gestor de Tasques</h1>
</div>
<p style="color:#666;margin-bottom:1.5rem;">Selecciona una secció per gestionar els recursos del sistema.</p>

<div class="menu-grid">
    <a href="usuaris.php" class="menu-card">
        <div class="icon">👥</div>
        <h2>Usuaris</h2>
    </a>
    <a href="projectes.php" class="menu-card">
        <div class="icon">📁</div>
        <h2>Projectes</h2>
    </a>
    <a href="tasques.php" class="menu-card">
        <div class="icon">✅</div>
        <h2>Tasques</h2>
    </a>
</div>

<?php require "_footer.php"; ?>
