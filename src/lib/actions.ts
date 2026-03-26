"use server";

import { prisma } from "./db";
import { login, logout, isAuthenticated } from "./auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// ─── Signup ──────────────────────────────────────────
export async function submitSignup(formData: FormData) {
  const courseSlug = formData.get("course") as string;
  const course = await prisma.course.findUnique({ where: { slug: courseSlug } });
  if (!course) throw new Error("Tečaj ne obstaja");

  const fullName = formData.get("fullName") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const participants = Number(formData.get("participants")) || 1;

  if (!fullName || !phone || !email) {
    throw new Error("Manjkajo obvezna polja");
  }

  await prisma.signup.create({
    data: {
      courseId: course.id,
      fullName,
      address: (formData.get("address") as string) || "",
      postalCode: (formData.get("postalCode") as string) || "",
      city: (formData.get("city") as string) || "",
      phone,
      email,
      participants,
      notes: (formData.get("notes") as string) || null,
    },
  });

  redirect(`/courses/${courseSlug}/success`);
}

// ─── Admin Auth ──────────────────────────────────────
export async function adminLogin(formData: FormData): Promise<{ error?: string }> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const ok = await login(username, password);
  if (!ok) return { error: "Napačno uporabniško ime ali geslo" };
  redirect("/admin");
}

export async function adminLogout() {
  await logout();
  redirect("/admin/login");
}

// ─── Admin Course Dates ──────────────────────────────
export async function addCourseDate(formData: FormData) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const courseId = formData.get("courseId") as string;
  const label = formData.get("label") as string;
  const capacity = Number(formData.get("capacity"));

  await prisma.courseDate.create({
    data: {
      courseId,
      label,
      capacity,
      spotsRemaining: capacity,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export async function updateCourseDate(formData: FormData) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const id = formData.get("id") as string;
  const label = formData.get("label") as string;
  const capacity = Number(formData.get("capacity"));
  const spotsRemaining = Math.min(Number(formData.get("spotsRemaining")), capacity);

  await prisma.courseDate.update({
    where: { id },
    data: { label, capacity, spotsRemaining },
  });

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export async function deleteCourseDate(formData: FormData) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const id = formData.get("id") as string;
  await prisma.courseDate.delete({ where: { id } });

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export async function deleteSignup(formData: FormData) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const id = formData.get("id") as string;
  await prisma.signup.delete({ where: { id } });

  revalidatePath("/admin");
  redirect("/admin");
}
