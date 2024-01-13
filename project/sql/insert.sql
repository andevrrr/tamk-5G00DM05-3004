INSERT INTO students (name, email) VALUES ('John Doe', 'johndoe@email.com');
INSERT INTO students (name, email) VALUES ('Jane Smith', 'janesmith@email.com');

INSERT INTO courses (title, description) VALUES ('Introduction to Biology', 'An introductory course to Biology');
INSERT INTO courses (title, description) VALUES ('Fundamentals of Physics', 'Exploring the basics of Physics');

INSERT INTO assignments (title, description, course_id, student_id) VALUES ('Biology Assignment 1', 'Assignment on Cell Biology', 1, 1);
INSERT INTO assignments (title, description, course_id, student_id) VALUES ('Physics Assignment 1', 'Assignment on Newtonian Mechanics', 2, 2);

INSERT INTO enrollments (student_id, course_id) VALUES (1, 1);
INSERT INTO enrollments (student_id, course_id) VALUES (2, 2);

INSERT INTO submissions (assignment_id, student_id, submission_date) VALUES (1, 1, '2024-01-09 10:00:00');
INSERT INTO submissions (assignment_id, student_id, submission_date) VALUES (2, 2, '2024-01-10 09:30:00');

INSERT INTO grades (submission_id, grade, feedback) VALUES (1, 90, 'Well done!');
INSERT INTO grades (submission_id, grade, feedback) VALUES (2, 85, 'Good effort.');
