-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-11
-- File: 061-coalesce-1.sql

SELECT deptno, ename, COALESCE(comm, 0) AS comm
FROM emp
WHERE deptno = 30
ORDER BY ename, comm;

-- End of file
