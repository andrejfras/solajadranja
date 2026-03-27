-- AlterTable
ALTER TABLE "course_dates" ADD COLUMN IF NOT EXISTS "featured" BOOLEAN NOT NULL DEFAULT false;
