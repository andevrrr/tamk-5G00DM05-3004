-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-27
-- File: 103-multiple-tables-and-self-join-3.sql

SELECT
    e.ename AS "Employee"
FROM
    emp AS e
    INNER JOIN emp AS m ON e.mgr = m.empno
WHERE
    e.sal > m.sal
ORDER BY
    "Employee";

-- End of file
