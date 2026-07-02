import { PrismaClient, ProjectRisk, ProjectStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.project.upsert({
    where: { id: 'seed-project-001' },
    update: {},
    create: {
      id: 'seed-project-001',
      name: 'Portal de Atendimento',
      startDate: new Date('2026-07-01'),
      endDate: new Date('2026-09-30'),
      totalBudget: 90000,
      description: 'Implantação de portal web para organizar solicitações internas.',
      status: ProjectStatus.ANALYSIS,
      risk: ProjectRisk.LOW,
    },
  });
}

main().finally(async () => prisma.$disconnect());
