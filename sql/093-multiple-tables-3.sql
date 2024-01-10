-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-24
-- File: 093-multiple-tables-3.sql

SELECT e.ename, d.dname, d.loc
FROM emp AS e
JOIN dept AS d ON e.deptno = d.deptno
WHERE e.comm IS NOT NULL AND e.comm > 0
ORDER BY e.ename ASC;

-- End of file
