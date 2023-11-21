-- Author: Anton Kucherenko anton.kucherenko@tuni.fi
-- Date: 2003-11-21
-- File: 012-list-tables.sql

-- ERRORS
-- 1. salary is names as sal in the db
-- 2. it needs a coma before sal
-- to multiply, * should be used instead of x
-- missing attribute AS
-- the string ANNUAL SALARY needs to be in single quotes because it consists of two words
-- missing FROM to indicate where it should search for all of that in

SELECT empno, ename,
        sal * 12 AS 'ANNUAL SALARY'
FROM emp
;


-- End of file