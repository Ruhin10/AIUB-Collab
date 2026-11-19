import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { AcademicIdentity } from "../../../common/enums/academic-identity.enum";

export class CreateCollabPostPreferredAcademicIdentityDto {
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
    description: "Preferred academic identity for the collaboration post",
    enum: AcademicIdentity,
    example: AcademicIdentity.STUDENT,
  })
  @IsNotEmpty({ message: "academic_identity is required" })
  @IsEnum(AcademicIdentity, {
    message: "academic_identity must be Student, Faculty, Alumni, or Staff",
  })
  academic_identity!: AcademicIdentity;
}

export class UpdateCollabPostPreferredAcademicIdentityDto {
  @ApiPropertyOptional({
    description: "Updated UUID of the collaboration post",
    format: "uuid",
    example: "550e8400-e29b-41d4-a716-446655440000",
  })
  @IsOptional()
  @IsUUID(undefined, {
    message: "collab_post_id must be a valid UUID",
  })
  collab_post_id?: string;

  @ApiPropertyOptional({
    description: "Updated preferred academic identity",
    enum: AcademicIdentity,
    example: AcademicIdentity.FACULTY,
  })
  @IsOptional()
  @IsEnum(AcademicIdentity, {
    message: "academic_identity must be Student, Faculty, Alumni, or Staff",
  })
  academic_identity?: AcademicIdentity;
}