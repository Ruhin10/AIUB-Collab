import { IsNotEmpty, IsUUID, ValidateIf } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCollabPostPreferredDepartmentDto {
  @ApiProperty({
    description: "UUID of the collaboration post",
    format: "uuid",
    example: "550e8400-e29b-41d4-a716-446655440000",
  })
  @IsNotEmpty({ message: "collab_post_id is required" })
  @IsUUID(undefined, {
    message: "collab_post_id must be a valid UUID",
  })
  collab_post_id!: string;

  @ApiProperty({
    description: "UUID of the preferred department",
    format: "uuid",
    example: "550e8400-e29b-41d4-a716-446655440001",
  })
  @IsNotEmpty({ message: "department_id is required" })
  @IsUUID(undefined, {
    message: "department_id must be a valid UUID",
  })
  department_id!: string;
}

export class UpdateCollabPostPreferredDepartmentDto {
  @ApiPropertyOptional({
    description: "Updated collaboration post UUID",
    format: "uuid",
    example: "550e8400-e29b-41d4-a716-446655440000",
  })
  @ValidateIf((_object, value) => value !== undefined)
  @IsUUID(undefined, {
    message: "collab_post_id must be a valid UUID",
  })
  collab_post_id?: string;

  @ApiPropertyOptional({
    description: "Updated preferred department UUID",
    format: "uuid",
    example: "550e8400-e29b-41d4-a716-446655440001",
  })
  @ValidateIf((_object, value) => value !== undefined)
  @IsUUID(undefined, {
    message: "department_id must be a valid UUID",
  })
  department_id?: string;
}