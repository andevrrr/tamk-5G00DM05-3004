-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-22
-- File: 083-group-functions-3.sql

SELECT MAX(sal) AS "high", MIN(sal) AS "low"
FROM emp
WHERE deptno IN (10, 30);

-- End of file
