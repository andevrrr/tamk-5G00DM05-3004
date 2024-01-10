-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-02
-- File: 032-order-by-2.sql

SELECT
    deptno AS "Dept",
    ename AS "Employee",
    ROUND(sal * 0.31, 2) AS "Taxes"
FROM
    emp
WHERE
    deptno = 10
ORDER BY
    deptno ASC,
    ename ASC;

-- End of file
