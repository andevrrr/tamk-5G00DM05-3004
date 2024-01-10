-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-11
-- File: 052-case-2.sql

SELECT ename,
       CASE
           WHEN deptno = 30 THEN
               CASE
                   WHEN comm IS NULL THEN 100
                   ELSE comm * 1.05
               END
           ELSE comm
       END AS comm
FROM emp
ORDER BY comm ASC, ename ASC;

-- End of file
