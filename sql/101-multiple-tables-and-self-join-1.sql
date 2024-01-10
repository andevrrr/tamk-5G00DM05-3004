-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-27
-- File: 101-multiple-tables-and-self-join-1.sql

SELECT
    e.ename AS "Employee",
    e.empno AS "Emp#",
    m.ename AS "Manager",
    m.empno AS "Mgr#"
FROM
    emp AS e
    INNER JOIN emp AS m ON e.mgr = m.empno
WHERE
    LOWER(m.ename) IN ('blake', 'ford', 'scott')
ORDER BY
    "Manager", "Employee";

-- End of file
