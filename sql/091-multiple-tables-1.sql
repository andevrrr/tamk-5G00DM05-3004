-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-24
-- File: 091-multiple-tables-1.sql

SELECT e.ename, e.deptno, d.dname
FROM emp e
JOIN dept d ON e.deptno = d.deptno
WHERE d.loc = 'DALLAS' OR e.job = 'SALESMAN'
ORDER BY e.ename;

-- End of file
