-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-27
-- File: 101-multiple-tables-and-self-join-1.sql

SELECT
    e.ename AS "Employee",
    e.empno AS "Emp#",
    m.ename AS "Manager",
    m.empno AS "Mgr#"
FROM
    emp e
    INNER JOIN emp m ON e.mgr = m.empno
WHERE
    m.ename IN ('BLAKE', 'FORD', 'SCOTT')
ORDER BY
    "Manager", "Employee";

-- End of file
