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

app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/submissions", submissionRoutes);

const createSqlFile = "./sql/create.sql";
const insertSqlFile = "./sql/insert.sql";

function runSqlFile(filePath) {
  const queries = fs
    .readFileSync(filePath, { encoding: "utf8", flag: "r" })
    .split(";");

  queries.forEach((query) => {
    if (query.trim()) {
      // Check if the query is not empty or whitespace
      console.log(`Executing query: ${query}`);
      db.run(query, (err) => {
        if (err) {
          console.error(`Error running query: ${err.message}`);
          throw err;
        }
      });
    }
  });
}

console.log("Running create.sql");
runSqlFile(createSqlFile);
// console.log("Running insert.sql"); // for now, works only once the tables are created and only one run time
// runSqlFile(insertSqlFile);


// the bellow SELECT is just for testing purposes, just for now
// db.all('SELECT * FROM students', (err, rows) => {
//     if (err) {
//       console.error(err.message);
//     } else {
//       console.log('Students:');
//       rows.forEach((row) => {
//         console.log(`ID: ${row.id}, Name: ${row.name}, Email: ${row.email}`);
//       });
//     }
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
