import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { setUserSession, getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default async function RegisterPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect(user.role === "ADMIN" ? "/admin" : "/student");
  }

  const classes = await prisma.class.findMany();

  async function handleRegister(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const classId = formData.get("classId") as string;

    // Generate student ID
    const studentCount = await prisma.user.count({
      where: { role: "STUDENT" },
    });
    const studentId = `STU${String(studentCount + 1).padStart(3, "0")}`;

    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          password,
          name,
          role: "STUDENT",
          studentId,
          classId: classId || null,
        },
      });

      await setUserSession(newUser.id);
      redirect("/student");
    } catch (error) {
      redirect("/register?error=exists");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-400">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Student Registration
          </CardTitle>
          <CardDescription className="text-center">
            Create your student account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="classId">Select Class (Optional)</Label>
              <Select name="classId">
                <SelectTrigger>
                  <SelectValue placeholder="Choose a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link
              href="/login"
              className="text-sm text-blue-600 hover:underline"
            >
              Already have an account? Sign in here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
