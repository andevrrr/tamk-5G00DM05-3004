-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-31
-- File: 111-create-table-1.sql

-- there are no missing LOWER() or UPPER() in this code

CREATE TABLE person (
    id INT NOT NULL PRIMARY KEY UNIQUE,
    last VARCHAR(255),
    first VARCHAR(255),
    phone VARCHAR(20) CHECK (LOWER(phone) LIKE '+%' AND LOWER(phone) NOT LIKE '%[^+ 0-9]%'),
    zip VARCHAR(10),
    city VARCHAR(255),
    address VARCHAR(255)
);

-- End of file
