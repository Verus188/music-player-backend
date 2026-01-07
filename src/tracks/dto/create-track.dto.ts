import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly artist: string;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  readonly duration: number;
}
