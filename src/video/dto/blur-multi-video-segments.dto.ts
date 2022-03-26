import { IsArray, ValidateNested } from 'class-validator';

class TimeLineDto {
  start: number;
  end: number;
}

export class BlurMultiVideoSegmentsDto {
  @IsArray()
  @ValidateNested({ each: true })
  blur_segments: [];
}
