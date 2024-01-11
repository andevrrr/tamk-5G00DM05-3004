-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-31
-- File: 114-create-table-4.sql

CREATE TABLE inventory (
    id INT PRIMARY KEY UNIQUE NOT NULL,
    item VARCHAR(255),
    worth INT,
    comment VARCHAR(1024)
);

-- End of file
