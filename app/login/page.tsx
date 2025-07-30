import { redirect } from "next/navigation";
import { login, setUserSession, getCurrentUser } from "@/lib/auth";
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
import Link from "next/link";

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect(user.role === "ADMIN" ? "/admin" : "/student");
  }

  async function handleLogin(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = await login(email, password);

    if (user) {
      await setUserSession(user.id);
      redirect(user.role === "ADMIN" ? "/admin" : "/student");
    } else {
      redirect("/login?error=invalid");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-400">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            School Management System
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleLogin} className="space-y-4">
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
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link
              href="/register"
              className="text-sm text-blue-600 hover:underline"
            >
              Don't have an account? Register here
            </Link>
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-sm">
            <p className="font-semibold mb-2">Demo Accounts:</p>
            <p>
              <strong>Admin:</strong> admin@school.com / admin123
            </p>
            <p>
              <strong>Student:</strong> john@student.com / student123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
