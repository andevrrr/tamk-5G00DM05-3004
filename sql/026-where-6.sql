-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-11-24
-- File: 026-where-6.sql

SELECT ename AS 'Employee',
       sal AS 'Monthly Salary'
FROM emp
WHERE sal > 1500 AND (deptno = 10 OR deptno = 30);

-- End of file
