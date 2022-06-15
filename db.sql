-- public.category definition

-- Drop table

-- DROP TABLE category;

CREATE TABLE category (
	id bigserial NOT NULL,
	category_name varchar(255) NOT NULL,
	"createdAt" timestamp NULL,
	"updatedAt" timestamp NULL,
	CONSTRAINT category_pkey PRIMARY KEY (id)
);


-- public.delivery definition

-- Drop table

-- DROP TABLE delivery;

CREATE TABLE delivery (
	id bigserial NOT NULL,
	delivery_name varchar NULL,
	CONSTRAINT delivery_pk PRIMARY KEY (id)
);


-- public.gender definition

-- Drop table

-- DROP TABLE gender;

CREATE TABLE gender (
	id varchar NOT NULL,
	gender varchar NULL,
	CONSTRAINT gender_pk PRIMARY KEY (id)
);


-- public.payment definition

-- Drop table

-- DROP TABLE payment;

CREATE TABLE payment (
	id int4 NOT NULL,
	payment_key varchar NULL,
	CONSTRAINT payment_pk PRIMARY KEY (id)
);


-- public.products definition

-- Drop table

-- DROP TABLE products;

CREATE TABLE products (
	id bigserial NOT NULL,
	product_name varchar(200) NULL,
	description varchar(1024) NULL,
	price numeric NULL,
	delivery_info varchar(200) NULL,
	product_size varchar(5) NULL,
	image varchar NULL,
	category_id int4 NULL,
	created_at timestamp NULL,
	updated_at timestamp NULL,
	CONSTRAINT products_pkey PRIMARY KEY (id)
);


-- public.promos definition

-- Drop table

-- DROP TABLE promos;

CREATE TABLE promos (
	id bigserial NOT NULL,
	promo_name varchar(25) NULL,
	description_promo varchar(300) NULL,
	promo_code varchar(30) NULL,
	date_start date NULL,
	end_date date NULL,
	created_at timestamp NULL,
	update_at timestamp NULL,
	image varchar NULL,
	CONSTRAINT promos_pkey PRIMARY KEY (id)
);


-- public.transactions definition

-- Drop table

-- DROP TABLE transactions;

CREATE TABLE transactions (
	id bigserial NOT NULL,
	item varchar NOT NULL,
	quantity int4 NOT NULL,
	delivery varchar NOT NULL,
	subtotal int4 NOT NULL,
	tax_shipping int4 NOT NULL,
	created_at date NOT NULL,
	price numeric NOT NULL,
	status varchar(25) NOT NULL,
	users_id int4 NULL,
	payment_id int4 NULL,
	promo_id int4 NULL,
	CONSTRAINT transactions_pkey PRIMARY KEY (id)
);


-- public.users definition

-- Drop table

-- DROP TABLE users;

CREATE TABLE users (
	id varchar(250) NOT NULL,
	email_address varchar(300) NULL,
	delivery_address varchar(1024) NULL,
	mobile_number numeric NULL,
	username varchar(50) NULL,
	first_name varchar(50) NULL,
	last_name varchar(50) NULL,
	birth_date date NULL,
	created_at timestamp NULL,
	updated_at timestamp NULL,
	image varchar NULL,
	"password" varchar NULL,
	gender_id int4 NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);