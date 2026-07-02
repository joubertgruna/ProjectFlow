import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'endDateAfterStartDate', async: false })
export class EndDateAfterStartDateConstraint implements ValidatorConstraintInterface {
  validate(endDate: Date, args: ValidationArguments) {
    const object = args.object as { startDate?: Date };
    return object.startDate instanceof Date && endDate instanceof Date && endDate > object.startDate;
  }

  defaultMessage() {
    return 'endDate deve ser maior que startDate';
  }
}
