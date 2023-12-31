-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-31
-- File: 111-create-table-1.sql

CREATE TABLE person (
    id INT PRIMARY KEY,
    last VARCHAR(255),
    first VARCHAR(255),
    phone VARCHAR(20) CHECK (phone LIKE '+%' AND phone NOT LIKE '%[^+ 0-9]%'),
    zip VARCHAR(10),
    city VARCHAR(255),
    address VARCHAR(255)
);

-- End of file
