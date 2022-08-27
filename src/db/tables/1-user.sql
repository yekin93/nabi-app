ALTER TABLE `user` ADD COLUMN is_active INT(2) UNSIGNED DEFAULT 0 AFTER `password`;
ALTER TABLE `user` ADD COLUMN is_deleted INT(2) UNSIGNED DEFAULT 0 AFTER `is_active`;
ALTER TABLE `user` ADD COLUMN `password` VARCHAR(255) NOT NULL AFTER email;

CREATE TABLE `user` (
    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `surname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    modified_time DATETIME DEFAULT NULL,
    created_time DATETIME DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE UK_user_email (email),
    INDEX IX_user_email (email),
    INDEX IX_user_name (`name`),
    INDEX IX_user_surname (`surname`)
);