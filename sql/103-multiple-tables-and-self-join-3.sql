-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-27
-- File: 103-multiple-tables-and-self-join-3.sql

SELECT
    e.ename AS "Employee"
FROM
    emp e
    INNER JOIN emp m ON e.mgr = m.empno
WHERE
    e.sal > m.sal
ORDER BY
    e.ename;

-- End of file
