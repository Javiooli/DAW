<?php
echo "PHP " . phpversion() . " OK<br>";
$conn = @mysqli_connect("sql312.infinityfree.com","if0_41919667","2025Jpl29103","if0_41919667_tasques");
if ($conn) {
    echo "MySQL OK<br>";
    $r = mysqli_query($conn, "SHOW TABLES");
    while ($row = mysqli_fetch_row($r)) echo "Taula: " . $row[0] . "<br>";
} else {
    echo "MySQL error: " . mysqli_connect_error();
}
?>
