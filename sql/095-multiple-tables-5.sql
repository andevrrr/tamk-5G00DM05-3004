-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-27
-- File: 095-multiple-tables-5.sql

SELECT e.ename, e.job, e.deptno, d.dname
FROM emp e
JOIN dept d ON e.deptno = d.deptno
WHERE d.dname IN ('ACCOUNTING', 'SALES', 'OPERATIONS') AND e.sal > 1000
ORDER BY e.ename;

-- End of file
