-- Author: Anton Kucherenko anton.kucherenko@tuni.fi
-- Date: 2003-12-06
-- File: 034-order-by-4.sql

SELECT
    ename AS "Employee",
    sal AS "Monthly Salary",
    ROUND(sal * 1.1, 2) AS "Sal 10%",
    comm AS "Comm"
FROM
    emp
WHERE
    comm > ROUND(sal * 1.1, 2)
ORDER BY
    ename ASC,
    sal ASC,
    comm ASC;

-- End of file