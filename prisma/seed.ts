import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing data (optional - remove if you want to keep existing data)
  console.log("🧹 Cleaning existing data...");
  await prisma.user.deleteMany();
  await prisma.class.deleteMany();

  // Create sample classes
  console.log("📚 Creating classes...");
  const mathClass = await prisma.class.create({
    data: {
      name: "Mathematics 101",
      description:
        "Basic Mathematics Course covering algebra, geometry, and calculus fundamentals",
      teacherName: "Dr. Smith",
    },
  });

  const englishClass = await prisma.class.create({
    data: {
      name: "English Literature",
      description:
        "Introduction to Literature - exploring classic and modern works",
      teacherName: "Prof. Johnson",
    },
  });

  const computerClass = await prisma.class.create({
    data: {
      name: "Computer Science",
      description: "Programming Fundamentals using Python and JavaScript",
      teacherName: "Dr. Wilson",
    },
  });

  const historyClass = await prisma.class.create({
    data: {
      name: "World History",
      description:
        "Comprehensive study of world civilizations and historical events",
      teacherName: "Ms. Davis",
    },
  });

  const scienceClass = await prisma.class.create({
    data: {
      name: "General Science",
      description: "Introduction to Physics, Chemistry, and Biology concepts",
      teacherName: "Dr. Brown",
    },
  });

  console.log(`✅ Created ${5} classes`);

  // Create admin users
  console.log("👨‍💼 Creating admin users...");
  const admin1 = await prisma.user.create({
    data: {
      email: "admin@school.com",
      password: "admin123",
      name: "School Administrator",
      role: "ADMIN",
    },
  });

  const admin2 = await prisma.user.create({
    data: {
      email: "principal@school.com",
      password: "principal123",
      name: "Principal Williams",
      role: "ADMIN",
    },
  });

  console.log(`✅ Created ${2} admin users`);

  // Create student users
  console.log("👨‍🎓 Creating student users...");
  const students = [
    {
      email: "john@student.com",
      password: "student123",
      name: "John Doe",
      studentId: "STU001",
      classId: mathClass.id,
    },
    {
      email: "jane@student.com",
      password: "student123",
      name: "Jane Smith",
      studentId: "STU002",
      classId: englishClass.id,
    },
    {
      email: "bob@student.com",
      password: "student123",
      name: "Bob Johnson",
      studentId: "STU003",
      classId: mathClass.id,
    },
    {
      email: "alice@student.com",
      password: "student123",
      name: "Alice Brown",
      studentId: "STU004",
      classId: computerClass.id,
    },
    {
      email: "charlie@student.com",
      password: "student123",
      name: "Charlie Wilson",
      studentId: "STU005",
      classId: historyClass.id,
    },
    {
      email: "diana@student.com",
      password: "student123",
      name: "Diana Davis",
      studentId: "STU006",
      classId: scienceClass.id,
    },
    {
      email: "edward@student.com",
      password: "student123",
      name: "Edward Miller",
      studentId: "STU007",
      classId: computerClass.id,
    },
    {
      email: "fiona@student.com",
      password: "student123",
      name: "Fiona Garcia",
      studentId: "STU008",
      classId: englishClass.id,
    },
    {
      email: "george@student.com",
      password: "student123",
      name: "George Martinez",
      studentId: "STU009",
      classId: mathClass.id,
    },
    {
      email: "helen@student.com",
      password: "student123",
      name: "Helen Rodriguez",
      studentId: "STU010",
      classId: scienceClass.id,
    },
  ];

  for (const studentData of students) {
    await prisma.user.create({
      data: {
        ...studentData,
        role: "STUDENT",
      },
    });
  }

  console.log(`✅ Created ${students.length} student users`);

  // Create some students without classes (for testing enrollment)
  const unassignedStudents = [
    {
      email: "ivan@student.com",
      password: "student123",
      name: "Ivan Thompson",
      studentId: "STU011",
    },
    {
      email: "julia@student.com",
      password: "student123",
      name: "Julia Anderson",
      studentId: "STU012",
    },
  ];

  for (const studentData of unassignedStudents) {
    await prisma.user.create({
      data: {
        ...studentData,
        role: "STUDENT",
        classId: null,
      },
    });
  }

  console.log(`✅ Created ${unassignedStudents.length} unassigned students`);

  // Display summary
  console.log("\n📊 Seeding Summary:");
  console.log("==================");

  const totalUsers = await prisma.user.count();
  const totalAdmins = await prisma.user.count({ where: { role: "ADMIN" } });
  const totalStudents = await prisma.user.count({ where: { role: "STUDENT" } });
  const totalClasses = await prisma.class.count();
  const studentsWithClasses = await prisma.user.count({
    where: {
      role: "STUDENT",
      classId: { not: null },
    },
  });

  console.log(`👥 Total Users: ${totalUsers}`);
  console.log(`👨‍💼 Admins: ${totalAdmins}`);
  console.log(`👨‍🎓 Students: ${totalStudents}`);
  console.log(`📚 Classes: ${totalClasses}`);
  console.log(`🎯 Students with Classes: ${studentsWithClasses}`);
  console.log(
    `❓ Students without Classes: ${totalStudents - studentsWithClasses}`
  );

  console.log("\n🔑 Demo Login Credentials:");
  console.log("=========================");
  console.log("Admin: admin@school.com / admin123");
  console.log("Admin: principal@school.com / principal123");
  console.log("Student: john@student.com / student123");
  console.log("Student: jane@student.com / student123");
  console.log("Student: alice@student.com / student123");

  console.log("\n🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
