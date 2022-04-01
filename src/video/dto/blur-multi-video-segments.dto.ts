import { IsArray, IsString, ValidateNested } from 'class-validator';

class TimeLineDto {
  start: number;
  end: number;
}

export class BlurMultiVideoSegmentsDto {
  @IsArray()
  @ValidateNested({ each: true })
  segments: [];

  @IsString()
  original_filename: string;

  @IsString()
  result_filename: string;
}
