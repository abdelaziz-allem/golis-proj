import { cookies } from "next/headers"
import { prisma } from "./prisma"

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("userId")?.value

  if (!userId) return null

  return await prisma.user.findUnique({
    where: { id: userId },
    include: { class: true },
  })
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { class: true },
  })

  if (!user || user.password !== password) {
    return null
  }

  return user
}

export async function setUserSession(userId: string) {
  const cookieStore = await cookies()
  cookieStore.set("userId", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("userId")
}
