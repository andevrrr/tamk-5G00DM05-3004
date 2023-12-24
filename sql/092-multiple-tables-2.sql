-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-24
-- File: 092-multiple-tables-2.sql

SELECT DISTINCT e.job
FROM emp e
JOIN dept d ON e.deptno = d.deptno
WHERE d.loc IN ('BOSTON', 'NEW YORK')
ORDER BY e.job;

-- End of file
