-- Author: Anton Kucherenko anton.kucherenko@tuni.fi
-- Date: 2003-12-06
-- File: 042-like-2.sql

-- there is no work description column, so instead i used job titles
-- sales and analyst(instead of analysis)

SELECT
    ename AS "Name",
    deptno AS "Department"
FROM
    emp
WHERE
    LOWER(SUBSTR(ename, 2, 1)) IN ('a', 'e', 'i', 'o', 'u', 'y')
    AND (LOWER(job) LIKE '%sales%' OR LOWER(job) LIKE '%analyst%')
ORDER BY
    deptno ASC,
    ename ASC;


-- End of file