import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  /**
   * @description user's email address
   */
  @ApiProperty({
    description: `user's name (string)`,
    type: [String],
    example: 'Selena',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  /**
   * @description user's email address
   */
  @ApiProperty({
    description: `user's email address`,
    type: [String],
    example: 'Selena.Pham@hays.co.jp',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * @description user's password (string)
   */
  @ApiProperty({
    description: `user's password (string)`,
    type: [String],
    example: 'password',
    required: true,
  })
  @IsNotEmpty()
  password: string;
}
