-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-31
-- File: 113-create-table-3.sql

CREATE TABLE weather (
    id INT NOT NULL PRIMARY KEY,
    time_of_reading TIMESTAMP NOT NULL,
    high DECIMAL(5, 2),
    low DECIMAL(5, 2),
    sig VARCHAR(2),
    comment TEXT
);

-- End of file
