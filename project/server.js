const express = require("express");
const app = express();

app.use(express.json());

const studentRoutes = require('./student');
const enrollmentRoutes = require('./enrollment');
const assignmentRoutes = require('./assignment');
const courseRoutes = require('./course');

app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/courses', courseRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
