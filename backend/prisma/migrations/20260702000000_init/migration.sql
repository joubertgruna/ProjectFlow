CREATE TYPE "ProjectStatus" AS ENUM ('ANALYSIS', 'APPROVED', 'IN_PROGRESS', 'FINISHED', 'CANCELLED');
CREATE TYPE "ProjectRisk" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalBudget" DECIMAL(14,2) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'ANALYSIS',
    "risk" "ProjectRisk" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
