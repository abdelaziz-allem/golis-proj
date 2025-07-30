-- Insert sample classes
INSERT INTO "classes" ("id", "name", "description", "teacherName", "updatedAt") VALUES
('class1', 'Mathematics 101', 'Basic Mathematics Course', 'Dr. Smith', CURRENT_TIMESTAMP),
('class2', 'English Literature', 'Introduction to Literature', 'Prof. Johnson', CURRENT_TIMESTAMP),
('class3', 'Computer Science', 'Programming Fundamentals', 'Dr. Wilson', CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- Insert admin user (password: admin123)
INSERT INTO "users" ("id", "email", "password", "name", "role", "updatedAt") VALUES
('admin1', 'admin@school.com', 'admin123', 'School Admin', 'ADMIN', CURRENT_TIMESTAMP)
ON CONFLICT ("email") DO NOTHING;

-- Insert sample students (password: student123)
INSERT INTO "users" ("id", "email", "password", "name", "role", "studentId", "classId", "updatedAt") VALUES
('student1', 'john@student.com', 'student123', 'John Doe', 'STUDENT', 'STU001', 'class1', CURRENT_TIMESTAMP),
('student2', 'jane@student.com', 'student123', 'Jane Smith', 'STUDENT', 'STU002', 'class2', CURRENT_TIMESTAMP),
('student3', 'bob@student.com', 'student123', 'Bob Johnson', 'STUDENT', 'STU003', 'class1', CURRENT_TIMESTAMP)
ON CONFLICT ("email") DO NOTHING;
