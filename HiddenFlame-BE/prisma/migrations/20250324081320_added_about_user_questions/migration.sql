-- AlterTable
ALTER TABLE "User" ADD COLUMN     "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "hobbies" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "relStatus" TEXT,
ADD COLUMN     "youAreRather" TEXT[] DEFAULT ARRAY[]::TEXT[];
