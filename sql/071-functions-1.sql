-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-17
-- File: 071-function-1.sql

SELECT LOWER(ename) AS Name, LOWER(job) AS Job, sal AS Salary
FROM emp
    ORDER BY Name ASC, Job ASC;

-- End of file
