CREATE TABLE company_application (
id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
first_name VARCHAR(255),
surname VARCHAR(255),
email VARCHAR(255),
tel_number VARCHAR(50),
country VARCHAR(255),
city VARCHAR(255),
post_code VARCHAR(15),
company_name VARCHAR(255),
category_id INT(10) UNSIGNED NOT NULL,
sales_category_id INT(10) UNSIGNED NOT NULL,
acccepted INT(2) UNSIGNED NOT NULL DEFAULT 0,
modified_date DATETIME,
created_date DATETIME,
is_deleted INT(2) UNSIGNED NOT NULL DEFAULT 0,
PRIMARY KEY (id),
CONSTRAINT FK_company_application_category_id FOREIGN KEY (category_id)
			REFERENCES categories (id)
			ON DELETE NO ACTION
            ON UPDATE NO ACTION,
CONSTRAINT FK_company_application_sales_category_id FOREIGN KEY (sales_category_id)
			REFERENCES sales_categories (id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
);

CREATE TABLE sales_categories(
id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
category_id INT(10) UNSIGNED NOT NULL,
`name` VARCHAR(255),
modified_date DATETIME,
created_date DATETIME,
is_deleted INT(2) NOT NULL DEFAULT 0,
PRIMARY KEY (id),
INDEX IX_sales_categories_category_id (category_id),
INDEX IX_sales_categories_name (`name`),
CONSTRAINT FK_sales_cateogires_category_id FOREIGN KEY (category_id)
			REFERENCES categories (id)
			ON DELETE NO ACTION
			ON UPDATE NO ACTION
);

ALTER TABLE company ADD CONSTRAINT FK_company_category_id FOREIGN KEY (category_id)
					REFERENCES categories (id)
					ON UPDATE NO ACTION
					ON DELETE NO ACTION;

ALTER TABLE company ADD COLUMN category_id INT(10) UNSIGNED NOT NULL AFTER id;

CREATE TABLE categories(
id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
category_name VARCHAR(255),
created_time DATETIME,
PRIMARY KEY (id),
INDEX IX_categories_category_name (category_name)
);