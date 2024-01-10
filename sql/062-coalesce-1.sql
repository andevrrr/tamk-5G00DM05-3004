-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2023-12-11
-- File: 062-coalesce-2.sql

SELECT ename AS Name,
       (COALESCE(sal, 0) * 0.69 + COALESCE(comm, 0) * 0.80) AS "Net Income",
       (COALESCE(sal, 0) * 0.31 + COALESCE(comm, 0) * 0.20) AS "Tax"
FROM emp
ORDER BY "Net Income";

-- End of file
