-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-02
-- File: 031-order-by-1.sql

SELECT ename, sal, sal * 1.15 AS "new salary"
FROM emp
WHERE mgr = (SELECT empno FROM emp WHERE ename = 'BLAKE')
ORDER BY "new salary", ename;

-- End of file
