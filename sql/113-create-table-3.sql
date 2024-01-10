-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-31
-- File: 113-create-table-3.sql

CREATE TABLE weather (
    id INT NOT NULL PRIMARY KEY UNIQUE,
    time_of_reading TIMESTAMP NOT NULL,
    high DECIMAL,
    low DECIMAL,
    sig VARCHAR(255),
    comment VARCHAR(MAX)
);

-- End of file
