import { Injectable } from '@nestjs/common';
import { ProjectRisk } from '../enums/project-risk.enum';

@Injectable()
export class RiskCalculatorService {
  calculate(totalBudget: number, startDate: Date, endDate: Date): ProjectRisk {
    const months = this.diffInMonths(startDate, endDate);

    if (totalBudget > 500000 || months > 6) {
      return ProjectRisk.HIGH;
    }

    if (totalBudget >= 100001 || months > 3) {
      return ProjectRisk.MEDIUM;
    }

    return ProjectRisk.LOW;
  }

  private diffInMonths(startDate: Date, endDate: Date): number {
    const days = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    return days / 30;
  }
}
