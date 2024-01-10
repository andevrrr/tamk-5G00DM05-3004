-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-11-24
-- File: 028-where-8.sql

SELECT ename, sal, comm
FROM emp
WHERE comm IS NOT NULL AND comm != 0;

-- End of file
