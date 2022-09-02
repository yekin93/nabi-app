CREATE TABLE user_role (
id INT(11) UNSIGNED AUTO_INCREMENT,
user_id INT(11) UNSIGNED NOT NULL,
role_id INT(11) UNSIGNED NOT NULL,
created_time DATETIME,
PRIMARY KEY (id),
INDEX IX_user_role_user_id (user_id),
INDEX IX_user_role_role_id (role_id),
CONSTRAINT FK_user_role_user_id FOREIGN KEY (user_id) 
			REFERENCES `user` (id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
CONSTRAINT FK_user_role_role_id FOREIGN KEY (role_id)
			REFERENCES `role` (id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
);
