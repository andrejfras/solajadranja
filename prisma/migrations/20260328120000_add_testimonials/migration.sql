-- CreateTable
CREATE TABLE IF NOT EXISTS "testimonials" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 5,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);
