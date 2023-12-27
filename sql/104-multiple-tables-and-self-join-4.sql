-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-27
-- File: 104-multiple-tables-and-self-join-4.sql

SELECT
    d.loc AS "Location",
    d.dname AS "Department",
    e.ename AS "Employee",
    m.ename AS "Manager"
FROM
    emp e
    INNER JOIN emp m ON e.mgr = m.empno
    INNER JOIN dept d ON e.deptno = d.deptno
    INNER JOIN salgrade s ON m.sal BETWEEN s.losal AND s.hisal
WHERE
    m.ename IN ('BLAKE', 'FORD', 'JONES')
    AND s.grade > 3
ORDER BY
    "Location", "Manager", "Employee";

-- End of file
