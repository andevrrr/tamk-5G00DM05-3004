-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-27
-- File: 095-multiple-tables-5.sql

SELECT e.ename, e.job, e.deptno, d.dname
FROM emp AS e
JOIN dept AS d ON e.deptno = d.deptno
WHERE LOWER(d.dname) IN ('accounting', 'sales', 'operations') AND e.sal > 1000
ORDER BY e.ename ASC;

-- End of file
