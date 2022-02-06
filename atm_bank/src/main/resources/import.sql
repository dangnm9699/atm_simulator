-- seed `users` table
INSERT INTO `users` (`id`, `description`, `name`) VALUE (1, 'Nguyen Minh Dang 20172998', 'Nguyen Minh Dang');
INSERT INTO `users` (`id`, `description`, `name`) VALUE (2, 'Hoang Manh Hung 20173155', 'Hoang Manh Hung');
INSERT INTO `users` (`id`, `description`, `name`) VALUE (3, 'Pham Van Chung 20172983', 'Pham Van Chung');
INSERT INTO `users` (`id`, `description`, `name`) VALUE (4, 'Nguyen Dinh Dat 20173011', 'Nguyen Dinh Dat');

-- seed `cards` table
INSERT INTO `cards` (`id`, `number`, `pin_hash`, `balance`, `valid_from`, `good_thru`, `status`, `user_id`) VALUE (1, '9704220123456789', '$2a$10$v70BK4shujIH5uSjeqYgkuYwKQ.6CV.4ifHZ4b2ehzujvjU9gxcxK', 22000000, '2021-12-21 00:00:00', '2026-12-21 00:00:00', 1, 1);
INSERT INTO `cards` (`id`, `number`, `pin_hash`, `balance`, `valid_from`, `good_thru`, `status`, `user_id`) VALUE (2, '9704221324756809', '$2a$10$2F9ueuwBUiCzpjo21aGYeufmCuyYsMn6aOL34LrP8phkkD.QN4Zlq', 22000000, '2021-12-21 00:00:00', '2026-12-21 00:00:00', 1, 2);
INSERT INTO `cards` (`id`, `number`, `pin_hash`, `balance`, `valid_from`, `good_thru`, `status`, `user_id`) VALUE (3, '9704220987654321', '$2a$10$m6O8xRTvDkeoBNHjPRT.cOFFaB5t0zJ7q/M.3QWZOiQmxeGCJ5cwu', 22000000, '2021-12-21 00:00:00', '2026-12-21 00:00:00', 1, 3);
INSERT INTO `cards` (`id`, `number`, `pin_hash`, `balance`, `valid_from`, `good_thru`, `status`, `user_id`) VALUE (4, '9704225647382910', '$2a$10$zVpEn9583NCZvDZqymu5veqEUzhJA4YKGX5qnHnJRRa.Kzrh6a49O', 22000000, '2021-12-21 00:00:00', '2026-12-21 00:00:00', 1, 4);

-- seed `atms` table
INSERT INTO `atms` (`id`, `name`, `ip`, `location`, `description`) VALUE (1, 'ATM IT5005', '172.92.16.42', '1st Dai Co Viet street', 'In use');
