-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-02
-- File: 031-order-by-1.sql

SELECT emp.ename, emp.sal, emp.sal * 1.15 AS "new salary"
FROM emp
JOIN emp AS manager ON emp.mgr = manager.empno
WHERE UPPER(manager.ename) = 'BLAKE'
ORDER BY "new salary", emp.ename;

-- End of file
