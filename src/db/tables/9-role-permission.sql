CREATE TABLE role_permission (
id INT(11) UNSIGNED AUTO_INCREMENT,
creator_id INT(11) UNSIGNED NOT NULL,
role_id INT(11) UNSIGNED NOT NULL,
permission_id INT(11) UNSIGNED NOT NULL,
created_time DATETIME,
PRIMARY KEY (id),
INDEX IX_role_permission_role_id (role_id),
INDEX IX_role_permission_permission_id (permission_id),
CONSTRAINT FK_role_permission_role_id FOREIGN KEY (role_id)
			REFERENCES `role` (id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
CONSTRAINT FK_role_permission_permission_id FOREIGN KEY (permission_id)
			REFERENCES `permission` (id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
);