-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-27
-- File: 094-multiple-tables-4.sql

SELECT e.ename, d.dname
FROM emp e
JOIN dept d ON e.deptno = d.deptno
WHERE e.ename LIKE '%a%' AND e.sal > 1100 AND e.sal <= 2200
ORDER BY e.ename;

-- End of file
