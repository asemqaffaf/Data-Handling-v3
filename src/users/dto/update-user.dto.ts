import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  /**
   * @description user's email address
   */
  @ApiProperty({
    description: `user's name (string)`,
    type: [String],
    example: 'Selena',
    required: false,
  })
  name: string;

  /**
   * @description user's email address
   */
  @ApiProperty({
    description: `user's email address`,
    type: [String],
    example: 'Selena.Pham@hays.co.jp',
    required: false,
  })
  @IsEmail()
  email: string;

  /**
   * @description user's password (string)
   */
  @ApiProperty({
    description: `user's password (string)`,
    type: [String],
    example: 'password',
    required: false,
  })
  password: string;
}
