
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