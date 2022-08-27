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