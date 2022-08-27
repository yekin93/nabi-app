ALTER TABLE `company_session` ADD COLUMN is_deleted INT(2) UNSIGNED DEFAULT 0 AFTER remember_me;

CREATE TABLE `company_session` (
id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
company_id INT(11) UNSIGNED NOT NULL,
token VARCHAR(255),
remember_me INT(2) DEFAULT 0,
created_time DATETIME,
PRIMARY KEY (id),
INDEX IX_session_toke (token),
CONSTRAINT FK_session_company_id FOREIGN KEY (company_id)
REFERENCES `company` (id)
ON UPDATE NO ACTION
ON DELETE NO ACTION
);