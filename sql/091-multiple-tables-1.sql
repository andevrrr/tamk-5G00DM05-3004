-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-24
-- File: 091-multiple-tables-1.sql

SELECT e.ename, e.deptno, d.dname
FROM emp AS e
JOIN dept AS d ON e.deptno = d.deptno
WHERE LOWER(d.loc) = 'dallas' OR LOWER(e.job) = 'salesman'
ORDER BY e.ename ASC;

-- End of file
