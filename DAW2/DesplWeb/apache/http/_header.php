<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle ?? 'Gestor de Tasques') ?></title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<nav>
    <span class="nav-brand">📋 Gestor de Tasques</span>
    <a href="index.php">Inici</a>
    <a href="usuaris.php">Usuaris</a>
    <a href="projectes.php">Projectes</a>
    <a href="tasques.php">Tasques</a>
</nav>
<div class="container">
