<?php
$host = "sql312.infinityfree.com";
$user = "if0_41919667";
$pass = "2025Jpl29103";
$db   = "if0_41919667_tasques";

$conn = mysqli_connect($host, $user, $pass, $db)
    or die("<p class='error'>Error en la connexió: " . mysqli_connect_error() . "</p>");

mysqli_set_charset($conn, "utf8mb4");
?>
