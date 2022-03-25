import { IsNumber } from 'class-validator';

export class BlurOneVideoSegmentDto {
  @IsNumber()
  start: number;

  @IsNumber()
  end: number;
}
