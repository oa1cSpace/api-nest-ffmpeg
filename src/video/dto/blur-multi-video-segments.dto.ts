import { IsArray, IsNumber } from 'class-validator';

export class BlurMultiVideoSegmentsDto {
  @IsArray()
  @IsNumber({}, {each: true})
  blur_segments: number[];
}
