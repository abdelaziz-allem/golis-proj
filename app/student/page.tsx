import { redirect } from "next/navigation";
import { getCurrentUser, logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function StudentDashboard() {
  const user = await getCurrentUser();

  if (!user || user.role !== "STUDENT") {
    redirect("/login");
  }

  async function handleLogout() {
    "use server";
    await logout();
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-orange-400">
      <header className="bg-orange-200 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Student Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {user.name}
              </span>
              <form action={handleLogout}>
                <Button variant="outline" type="submit">
                  Logout
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Student ID</p>
                <p className="text-lg font-semibold">{user.studentId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p className="text-lg">{user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <Badge variant="secondary">{user.role}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Class Information</CardTitle>
              <CardDescription>Your enrolled class details</CardDescription>
            </CardHeader>
            <CardContent>
              {user.class ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Class Name
                    </p>
                    <p className="text-lg font-semibold">{user.class.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Teacher</p>
                    <p className="text-lg">{user.class.teacherName}</p>
                  </div>
                  {user.class.description && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Description
                      </p>
                      <p className="text-sm text-gray-700">
                        {user.class.description}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    You are not enrolled in any class yet.
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Contact your administrator to get enrolled.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Things you can do</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-20 flex-col bg-transparent"
              >
                <span className="text-lg mb-1">📚</span>
                View Assignments
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col bg-transparent"
              >
                <span className="text-lg mb-1">📊</span>
                Check Grades
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col bg-transparent"
              >
                <span className="text-lg mb-1">📅</span>
                Class Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
