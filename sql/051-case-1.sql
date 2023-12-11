-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-11
-- File: 051-case-1.sql

SELECT ename AS Name,
       CASE
           WHEN job = 'SALESMAN' THEN 'SALES PERSON'
           ELSE job
       END AS "New Job Name"
FROM emp
ORDER BY "New Job Name", Name;

-- End of file
