-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-24
-- File: 092-multiple-tables-2.sql

SELECT DISTINCT e.job
FROM emp AS e
JOIN dept AS d ON e.deptno = d.deptno
WHERE LOWER(d.loc) IN ('boston', 'new york')
ORDER BY e.job ASC;

-- End of file
