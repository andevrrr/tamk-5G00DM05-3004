-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-17
-- File: 072-function-2.sql

SELECT ename AS Name, LENGTH(ename) AS Characters
FROM emp
ORDER BY Characters ASC, Name ASC;

-- End of file
