1. create.sql & insert.sql
------------------------------------
Start the server, run:
npm start

The server itself will create tables and insert data into them. If the tables are not empty, their contents will remain. If you want to clear the tables, follow the next step.

2. delete.sql
-------------------
To clear the tables, run:

- Go to the sql directory: cd project/sql
- Run: sqlite3 ../database.db
- Write: .read delete.sql
- Write: .exit to exit the SQLite prompt;
