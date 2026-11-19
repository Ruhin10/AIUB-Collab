import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID, IsUrl } from "class-validator";

export class CreateUserLinkedProfileDto {
  @ApiProperty({
    description: "UUID of the user profile",
    format: "uuid",
    example: "550e8400-e29b-41d4-a716-446655440000",
  })
  @IsNotEmpty({ message: "user_profile_id is required" })
  @IsUUID(undefined, {
    message: "user_profile_id must be a valid UUID",
  })
  user_profile_id!: string;

  @ApiProperty({
    description: "Name of the external platform",
    example: "LinkedIn",
  })
  @IsNotEmpty({ message: "platform_name is required" })
  @IsString({ message: "platform_name must be a string" })
  platform_name!: string;

  @ApiProperty({
    description: "URL of the user's profile on that platform",
    format: "url",
    example: "https://www.linkedin.com/in/example",
  })
  @IsNotEmpty({ message: "profile_url is required" })
  @IsUrl(undefined, {
    message: "profile_url must be a valid URL",
  })
  profile_url!: string;
}

export class UpdateUserLinkedProfileDto {
  @ApiPropertyOptional({
    description: "Updated name of the external platform",
    example: "GitHub",
  })
  @IsOptional()
  @IsString({ message: "platform_name must be a string" })
  platform_name?: string;

  @ApiPropertyOptional({
    description: "Updated URL of the user's profile on that platform",
    format: "url",
    example: "https://github.com/example",
  })
  @IsOptional()
  @IsUrl(undefined, {
    message: "profile_url must be a valid URL",
  })
  profile_url?: string;
}