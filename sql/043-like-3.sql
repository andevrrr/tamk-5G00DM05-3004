-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-06
-- File: 043-like-3.sql

SELECT
    ename
FROM
    emp
WHERE
    LOWER(ename) LIKE '%l%l%'
    AND (deptno = 10 OR mgr = 7782);

-- End of file
