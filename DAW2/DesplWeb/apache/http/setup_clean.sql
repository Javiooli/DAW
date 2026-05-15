CREATE TABLE `effort` (
  `effort_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `notes` varchar(500) NOT NULL,
  `time_spent` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `projects` (
  `project_id` int(11) NOT NULL,
  `project_name` varchar(20) NOT NULL,
  `project_description` varchar(200) NOT NULL,
  `lead_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
INSERT INTO `projects` (`project_id`, `project_name`, `project_description`, `lead_user_id`) VALUES
(1, 'V.I.P.', 'This project is crucial for the development of modern society and must succeed in every single task in order not to provoke a systemic failure in the development of a new world order.', 3);
CREATE TABLE `tasks` (
  `task_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `project_id` int(11) NOT NULL,
  `summary` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL,
  `task_type` int(11) NOT NULL,
  `status` varchar(20) NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
INSERT INTO `tasks` (`task_id`, `user_id`, `project_id`, `summary`, `description`, `task_type`, `status`, `completed`) VALUES
(22, 1, 1, 'Design official \"Great Shift\" narrative', 'Draft the conceptual framework that presents the new world order as an inevitable, sustainable, and surprisingly convenient evolution.', 5, 'In progress', 0),
(23, NULL, 1, 'Create network of “organic” social media accounts', 'Set up seemingly independent profiles to amplify the message through debates that appear naturally occurring.', 5, 'To be assigned', 0),
(24, 2, 1, 'Identify key profiles at international orgs.', 'Map decision-makers who may be receptive to flattery, incentives, or invitations to very exclusive dinners.', 6, 'In progress', 0),
(25, 2, 1, 'Simulate a charity event for strategic networking', 'Organize a philanthropic gala that serves as a cover for establishing high-level contacts.', 6, 'On hold', 0),
(26, 3, 1, 'Prototype a social behavior prediction algorithm', 'Develop a model capable of anticipating social trends and potential resistance hotspots.', 7, 'In progress', 0),
(27, NULL, 1, 'Implement centralized resource management system', 'Design a platform to optimize energy, food, and logistics distribution… for the greater good.', 7, 'To be assigned', 0),
(28, 1, 1, 'P. o. C. for a global digital identity platform', 'Create a unified environment for citizen registration, authentication, and tracking (efficient, right?).', 7, 'On hold', 0);
CREATE TABLE `task_types` (
  `task_type_id` int(11) NOT NULL,
  `task_type_name` varchar(20) NOT NULL,
  `task_type_description` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
INSERT INTO `task_types` (`task_type_id`, `task_type_name`, `task_type_description`) VALUES
(5, 'Media Manipulation', 'Design, plan and execute disinformation campaings, subtle propaganda or strategic narratives to influence in public opinion without suspicions.'),
(6, 'Adv. Social Eng.', 'Actions destined to gaining key individuals\' trust, infiltrate organizations or provoke strategic decisions through psychological techniques.'),
(7, 'Disruptive Tech Dev.', 'Research and development of revolutionary technological tools that grant competitive advantage.');
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `permission_level` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
INSERT INTO `users` (`user_id`, `username`, `full_name`, `password`, `permission_level`) VALUES
(1, 'Javiooli', 'Javier Pedragosa Lozano', 'admin1234', 3),
(2, 'SoloPa', 'Solomeo Paredes García', 'user1234', 1),
(3, 'PaMer', 'Paco Meralgo Ruiz', 'manager1234', 2);
ALTER TABLE `effort`
  ADD PRIMARY KEY (`effort_id`),
  ADD KEY `effort_to_task` (`task_id`),
  ADD KEY `effort_to_user` (`user_id`);
ALTER TABLE `projects`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `lead_user_on_project` (`lead_user_id`);
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `task_assignee` (`user_id`),
  ADD KEY `task_project` (`project_id`),
  ADD KEY `task_type` (`task_type`);
ALTER TABLE `task_types`
  ADD PRIMARY KEY (`task_type_id`);
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);
ALTER TABLE `effort`
  MODIFY `effort_id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `projects`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
ALTER TABLE `tasks`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
ALTER TABLE `task_types`
  MODIFY `task_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `effort`
  ADD CONSTRAINT `effort_to_task` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`),
  ADD CONSTRAINT `effort_to_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
ALTER TABLE `projects`
  ADD CONSTRAINT `lead_user_on_project` FOREIGN KEY (`lead_user_id`) REFERENCES `users` (`user_id`);
ALTER TABLE `tasks`
  ADD CONSTRAINT `task_assignee` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `task_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`),
  ADD CONSTRAINT `task_type` FOREIGN KEY (`task_type`) REFERENCES `task_types` (`task_type_id`);