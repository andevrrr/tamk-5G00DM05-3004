-- Author: Anton Kucherenko anton.kucherenko@tuni.fi
-- Date: 2003-11-24
-- File: 027-where-7.sql

SELECT ename, job, sal
FROM emp
WHERE (job = 'CLERK' OR job = 'ANALYST')
AND (sal <> 1000 OR sal <> 5000);

-- End of file