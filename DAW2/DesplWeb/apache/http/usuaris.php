<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestió d'Usuaris</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Hola Món</h1>
    
    <?php
        require "config.php";

        $sql = "SELECT * FROM users";

        $result = mysqli_query($conn, $sql);
    ?>
    
    <div class="container">
        <h1 style="color: #333;">USUARIS</h1>
        <table>
            <thead>
                <tr>
                    <th>Nom usuari</th>
                    <th>Nom complet</th>
                    <th>Nivell permisos</th>
                    <th>Accions</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    while($row = mysqli_fetch_array($result)) { ?>
                        <tr>
                            <td><?= $row["username"] ?></td>
                            <td><?= $row["full_name"] ?></td>
                            <td><?= $row["permission_level"] ?></td>
                            <td>
                                <a href="usuaris_edit.php?id=<?= $row["user_id"] ?>">Editar/consultar</a>
                                <a href="usuaris_delete.php?id=<?= $row["user_id"] ?>">Esborrar</a>
                            </td>
                        </tr>
                <?php
                    }
                ?>
            </tbody>
        </table>
        <a href="usuaris_add.php">Afegir usuari</a>
        <br>
        <a href="index.php">Tornar al menú</a>
    </div>
</body>
</html>
