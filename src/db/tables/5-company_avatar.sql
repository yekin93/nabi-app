CREATE TABLE `company_avatar` (
id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
company_id INT(11) UNSIGNED NOT NULL,
filename VARCHAR(255),
file_ext VARCHAR(20),
is_deleted INT(2) UNSIGNED DEFAULT 0,
modified_time DATETIME,
created_time DATETIME,
PRIMARY KEY (id),
INDEX IX_company_avatar_company_id (company_id),
CONSTRAINT FK_company_avatar_company_id FOREIGN KEY (company_id) 
		REFERENCES company (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)