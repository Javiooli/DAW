<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

$conn = mysqli_connect("localhost","admin","P@ssw0rd","gestor_tasques") or exit("Error en la connexió.");

echo "<h4>Connexió establerta correctament.</h4>";

?>
