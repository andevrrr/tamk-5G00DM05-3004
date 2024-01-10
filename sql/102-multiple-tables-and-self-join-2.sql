-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-27
-- File: 102-multiple-tables-and-self-join-2.sql

SELECT
    e1.deptno AS "Dept",
    e1.ename AS "Employee",
    e2.ename AS "Colleague"
FROM
    emp e1
    JOIN emp e2 ON e1.deptno = e2.deptno
WHERE
    e1.empno <> e2.empno
ORDER BY
    "Dept" ASC,
    "Employee" ASC,
    "Colleague" ASC;

-- End of file
