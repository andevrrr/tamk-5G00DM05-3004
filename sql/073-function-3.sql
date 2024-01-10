-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-17
-- File: 073-function-3.sql

SELECT
    empno,
    ename,
    ROUND(sal * 1.15) AS "new salary",
    ROUND(sal * 1.15) - sal AS increase
FROM emp
ORDER BY ename ASC, "new salary" ASC;
-- End of file
