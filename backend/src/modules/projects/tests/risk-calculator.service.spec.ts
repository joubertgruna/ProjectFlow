import { RiskCalculatorService } from '../services/risk-calculator.service';
import { ProjectRisk } from '../enums/project-risk.enum';

describe('RiskCalculatorService', () => {
  const service = new RiskCalculatorService();

  it('calcula risco LOW', () => {
    expect(service.calculate(100000, new Date('2026-01-01'), new Date('2026-03-31'))).toBe(
      ProjectRisk.LOW,
    );
  });

  it('calcula risco MEDIUM por orçamento', () => {
    expect(service.calculate(100001, new Date('2026-01-01'), new Date('2026-03-31'))).toBe(
      ProjectRisk.MEDIUM,
    );
  });

  it('calcula risco MEDIUM por prazo', () => {
    expect(service.calculate(90000, new Date('2026-01-01'), new Date('2026-05-01'))).toBe(
      ProjectRisk.MEDIUM,
    );
  });

  it('calcula risco HIGH por orçamento', () => {
    expect(service.calculate(500001, new Date('2026-01-01'), new Date('2026-03-31'))).toBe(
      ProjectRisk.HIGH,
    );
  });

  it('calcula risco HIGH por prazo', () => {
    expect(service.calculate(90000, new Date('2026-01-01'), new Date('2026-08-01'))).toBe(
      ProjectRisk.HIGH,
    );
  });
});
