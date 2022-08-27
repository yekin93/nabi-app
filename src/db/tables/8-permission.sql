CREATE TABLE permission (
id INT(11) UNSIGNED AUTO_INCREMENT,
creator_id INT(11) UNSIGNED NOT NULL,
permission_name VARCHAR(255),
is_deleted INT(2) UNSIGNED DEFAULT 0,
modified_time DATETIME,
created_time DATETIME,
PRIMARY KEY (id),
INDEX IX_permission_permission_name (permission_name)
);