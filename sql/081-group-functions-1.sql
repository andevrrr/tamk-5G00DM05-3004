-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-22
-- File: 081-group-functions-1.sql

SELECT SUM(num) AS "count of managers"
FROM (
    SELECT COUNT(*) AS num
    FROM emp
    WHERE UPPER(job) IN ('MANAGER', 'PRESIDENT')
    GROUP BY job
);

-- End of file
