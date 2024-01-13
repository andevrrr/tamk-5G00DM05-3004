-- Author: Anton Kucherenko <anton.kucherenko@tuni.fi>
-- Date: 2024-01-12

Project Setup and Run Instructions
==================================

1. Install Node.js and npm
----------------------------
Ensure Node.js and npm (Node Package Manager) are installed on your system.
If not, download and install them from https://nodejs.org/.

2. Clone the Repository
-----------------------
Clone the source code from the repository to your local machine.
Use the command:
git clone https://github.com/andevrrr/tamk-5G00DM05-3004.git

3. Navigate to the Project Directory
------------------------------------
Change into the project directory:
cd project

4. Install Dependencies
-----------------------
Run the following command to install the necessary dependencies:
npm install

5. Database Setup
-----------------
Make sure you have SQLite installed on your system.

6. Start the Server
-------------------
To start the server, run:
npm start

The server itself will create tables and insert data into them. If the tables are not empty, their contents will remain. If you want to clear the tables, run delete.sql (more detailed instraction in the sql/README.txt file).

7. Accessing the API
--------------------
Once the server is running, you can access the API at:
http://localhost:3000/api/

For example:
- GET /api/assignments to retrieve all students.
- GET /api/assignments/course/:courseId to retrieve all assignments for a specific course. The endpoint is only unique for the assignments route.
- GET /api/assignments/assignments?course_id=1&student_id=1 to retrieve assignments filtered by both course_id and student_id. The endpoint is only unique for the assignments route.
- GET /api/assignments/:id
- POST /api/assignments

{
    "title": "New Assignment",
    "description": "Assignment Details",
    "course_id": 1,
    "student_id": 2
}

- PATCH /api/assignments/:id

{
    "title": "Updated Title",
    "description": "Updated Description"
}

- DELETE /api/assignments/:id

The structure of the endpoints for other entities like courses or students would be similar to those for assignments, with the primary difference being the endpoint name and the specific data handled. Here's a simplified overview:
- GET /api/courses
- GET /api/students
- GET /api/enrollments
- GET /api/grades
- GET /api/submissions
- etc..

-- End of file
