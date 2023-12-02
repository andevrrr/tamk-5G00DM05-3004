-- Author: Anton Kucherenko anton.kucherenko@tuni.fi
-- Date: 2003-12-02
-- File: 033-order-by-3.sql

SELECT
    deptno AS "Dept",
    ename AS "Employee",
    ROUND(sal * 0.31, 2) AS "Taxes"
FROM
    emp
WHERE
    deptno = 10
ORDER BY
    deptno, ename;

-- End of file