import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString, Min, Validate } from 'class-validator';
import { EndDateAfterStartDateConstraint } from './validators/end-date-after-start-date.validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: '2026-07-01' })
  @Type(() => Date)
  @IsDate()
  startDate!: Date;

  @ApiProperty({ example: '2026-10-01' })
  @Type(() => Date)
  @IsDate()
  @Validate(EndDateAfterStartDateConstraint)
  endDate!: Date;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  totalBudget!: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description!: string;
}
