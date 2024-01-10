-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-31
-- File: 112-create-table-2.sql

CREATE TABLE football (
    id INT NOT NULL PRIMARY KEY UNIQUE,
    first VARCHAR(255),
    last VARCHAR(255),
    team VARCHAR(255),
    comment VARCHAR(MAX)
);

-- End of file
