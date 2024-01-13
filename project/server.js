const express = require("express");
const app = express();
const fs = require("fs");
const db = require("./database.js");

app.use(express.json());

const studentRoutes = require("./student");
const enrollmentRoutes = require("./enrollment");
const assignmentRoutes = require("./assignment");
const courseRoutes = require("./course");
const submissionRoutes = require("./submission.js");
const gradeRoutes = require("./grade.js");

app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/grades", gradeRoutes);

app.use((err, req, res, next) => {
  if (err.status === 400) {
    // Validation error
    res.status(400).json({ validationErrors: err.errors });
  } else if (err.status === 404) {
    // Not found error
    res.status(404).json({ error: err.message });
  } else {
    // Unexpected server error
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const createSqlFile = "./sql/create.sql";
const insertSqlFile = "./sql/insert.sql";

function areTablesEmpty(callback) {
  // Define the primary key column for each table
  const tables = {
    'students': 'id',
    'courses': 'id',
    'assignments': 'id',
    'enrollments': 'id',
    'submissions': 'id',
    'grades': 'id'
  };

  let empty = true;
  let tablesChecked = 0;

  Object.entries(tables).forEach(([table, primaryKey]) => {
    db.get(`SELECT ${primaryKey} FROM ${table} LIMIT 1`, (err, row) => {
      tablesChecked++;
      if (err) {
        console.error(`Error checking table ${table}: ${err.message}`);
        throw err;
      }
      if (row) {
        empty = false;
      }
      // Check if this is the last table to be checked
      if (tablesChecked === Object.keys(tables).length) {
        callback(empty);
      }
    });
  });
}

async function runSqlFile(filePath) {
  const queries = fs
    .readFileSync(filePath, { encoding: "utf8", flag: "r" })
    .split(";")
    .map(query => query.trim())
    .filter(query => query.length);

  for (const query of queries) {
    await new Promise((resolve, reject) => {
      db.run(query, err => {
        if (err) {
          console.error(`Error running query: ${err.message}`);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

async function initializeDatabase() {
  try {
    console.log("Running create.sql");
    await runSqlFile(createSqlFile);

    console.log("Checking if tables are empty");
    await areTablesEmpty(async (empty) => {
      if (empty) {
        console.log("Running insert.sql");
        await runSqlFile(insertSqlFile);
        console.log("Tables are inserted successfully");
      } else {
        console.log("Tables already have data. Skipping insert.sql");
      }
    });
  } catch (error) {
    console.error("An error occurred during database initialization:", error);
  }
}

initializeDatabase();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
