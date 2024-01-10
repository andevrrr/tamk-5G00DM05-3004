-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-17
-- File: 074-function-4.sql

SELECT
    ename,
    CASE
        WHEN SUBSTR(ename, 1, 1) IN ('A', 'M', 'J') THEN LOWER(job)
        ELSE job
    END AS job
FROM emp
ORDER BY ename ASC, job ASC;


-- End of file
