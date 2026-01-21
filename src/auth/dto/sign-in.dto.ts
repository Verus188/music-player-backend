import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'anton@gmail.com',
    description: 'Email пользователя',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'qwerty12345',
    description: 'Пароль пользователя',
  })
  readonly password: string;
}
