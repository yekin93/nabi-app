ALTER TABLE company ADD COLUMN avatar VARCHAR(255) AFTER `password`;

ALTER TABLE company ADD COLUMN is_active INT(2) DEFAULT 0 AFTER `password`;

CREATE TABLE company (
id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
`name` VARCHAR(255) NOT NULL,
`email` VARCHAR(255) NOT NULL,
`password` VARCHAR(255) NOT NULL,
modified_time DATETIME, 
created_time DATETIME,
PRIMARY KEY (id),
INDEX IX_company_name (`name`),
INDEX IX_company_email (`email`),
UNIQUE UK_company_email (`email`)
);

CREATE TABLE `activation` (
id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
user_id INT(11) UNSIGNED NOT NULL,
token VARCHAR(255),
created_time DATETIME,
PRIMARY KEY (id),
INDEX IX_activation_token (token),
CONSTRAINT FK_activation_user_id FOREIGN KEY (user_id)
REFERENCES `user` (id)
ON UPDATE NO ACTION
ON DELETE NO ACTION
);

ALTER TABLE `session` ADD COLUMN is_deleted INT(2) UNSIGNED DEFAULT 0 AFTER remember_me;

CREATE TABLE `session` (
    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT(11) UNSIGNED NOT NULL,
    token VARCHAR(255),
    remember_me INT(2) DEFAULT 0,
    created_time DATETIME,
    PRIMARY KEY (id),
    INDEX IX_session_toke (token),
    CONSTRAINT FK_session_user_id FOREIGN KEY (user_id)
    REFERENCES `user` (id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
);

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