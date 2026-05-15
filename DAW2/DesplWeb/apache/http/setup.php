<?php
require "config.php";
$results = [];

$statements = [
    // Tables
    "CREATE TABLE IF NOT EXISTS `effort` (`effort_id` int(11) NOT NULL AUTO_INCREMENT, `user_id` int(11) NOT NULL, `task_id` int(11) NOT NULL, `notes` varchar(500) NOT NULL, `time_spent` decimal(10,2) NOT NULL, PRIMARY KEY (`effort_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",
    "CREATE TABLE IF NOT EXISTS `projects` (`project_id` int(11) NOT NULL AUTO_INCREMENT, `project_name` varchar(20) NOT NULL, `project_description` varchar(200) NOT NULL, `lead_user_id` int(11) NOT NULL, PRIMARY KEY (`project_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",
    "CREATE TABLE IF NOT EXISTS `task_types` (`task_type_id` int(11) NOT NULL AUTO_INCREMENT, `task_type_name` varchar(20) NOT NULL, `task_type_description` varchar(200) NOT NULL, PRIMARY KEY (`task_type_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",
    "CREATE TABLE IF NOT EXISTS `users` (`user_id` int(11) NOT NULL AUTO_INCREMENT, `username` varchar(20) NOT NULL, `full_name` varchar(50) NOT NULL, `password` varchar(20) NOT NULL, `permission_level` int(11) NOT NULL DEFAULT 1, PRIMARY KEY (`user_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",
    "CREATE TABLE IF NOT EXISTS `tasks` (`task_id` int(11) NOT NULL AUTO_INCREMENT, `user_id` int(11) DEFAULT NULL, `project_id` int(11) NOT NULL, `summary` varchar(50) NOT NULL, `description` varchar(200) NOT NULL, `task_type` int(11) NOT NULL, `status` varchar(20) NOT NULL, `completed` tinyint(1) NOT NULL DEFAULT 0, PRIMARY KEY (`task_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",
    // Data
    "INSERT IGNORE INTO `task_types` VALUES (5,'Media Manipulation','Design, plan and execute disinformation campaigns.'),(6,'Adv. Social Eng.','Gaining key individuals trust through psychological techniques.'),(7,'Disruptive Tech Dev.','Research and development of revolutionary technological tools.')",
    "INSERT IGNORE INTO `users` VALUES (1,'Javiooli','Javier Pedragosa Lozano','admin1234',3),(2,'SoloPa','Solomeo Paredes García','user1234',1),(3,'PaMer','Paco Meralgo Ruiz','manager1234',2)",
    "INSERT IGNORE INTO `projects` VALUES (1,'V.I.P.','This project is crucial for the development of modern society.',3)",
    "INSERT IGNORE INTO `tasks` VALUES (22,1,1,'Design official narrative','Draft the conceptual framework for the new world order.',5,'In progress',0),(23,NULL,1,'Create social media accounts','Set up seemingly independent profiles.',5,'To be assigned',0),(24,2,1,'Identify key profiles','Map decision-makers at international orgs.',6,'In progress',0),(25,2,1,'Simulate charity event','Organize a philanthropic gala for networking.',6,'On hold',0),(26,3,1,'Prototype prediction algorithm','Develop a model for social trends.',7,'In progress',0),(27,NULL,1,'Centralized resource system','Design a platform for resource distribution.',7,'To be assigned',0),(28,1,1,'Global digital identity PoC','Unified environment for citizen registration.',7,'On hold',0)",
    // Foreign keys
    "ALTER TABLE `effort` ADD CONSTRAINT `effort_to_task` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`), ADD CONSTRAINT `effort_to_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)",
    "ALTER TABLE `projects` ADD CONSTRAINT `lead_user_on_project` FOREIGN KEY (`lead_user_id`) REFERENCES `users` (`user_id`)",
    "ALTER TABLE `tasks` ADD CONSTRAINT `task_assignee` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`), ADD CONSTRAINT `task_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`), ADD CONSTRAINT `task_type_fk` FOREIGN KEY (`task_type`) REFERENCES `task_types` (`task_type_id`)",
];

$ok = 0; $errors = [];
foreach ($statements as $sql) {
    if (mysqli_query($conn, $sql)) {
        $ok++;
    } else {
        $err = mysqli_error($conn);
        // Ignore duplicate key / already exists errors
        if (!str_contains($err, 'Duplicate') && !str_contains($err, 'already exists')) {
            $errors[] = $err . " — " . substr($sql, 0, 60);
        }
    }
}

echo "<h2>Setup completat</h2><p>OK: <strong>$ok</strong></p>";
if ($errors) {
    echo "<ul>"; foreach ($errors as $e) echo "<li>" . htmlspecialchars($e) . "</li>"; echo "</ul>";
}
$tables = [];
$res = mysqli_query($conn, "SHOW TABLES");
while ($r = mysqli_fetch_row($res)) $tables[] = $r[0];
echo "<p>Taules: <strong>" . implode(', ', $tables) . "</strong></p>";
$users = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) AS n FROM users"))['n'];
$tasks = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) AS n FROM tasks"))['n'];
echo "<p>Usuaris: $users | Tasques: $tasks</p>";
echo "<p><strong>ESBORRA AQUEST FITXER!</strong></p>";
?>
