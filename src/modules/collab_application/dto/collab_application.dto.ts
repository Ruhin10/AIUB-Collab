import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ApplicationStatus } from "../../../common/enums/application-status.enum";

export class CreateCollabApplicationDto {
  @ApiProperty({
    description: "UUID of the collaboration post",
    format: "uuid",
    example: "550e8400-e29b-41d4-a716-446655440000",
  })
  @IsNotEmpty({ message: "collab_post_id is required" })
  @IsUUID(undefined, { message: "collab_post_id must be a valid UUID" })
  collab_post_id!: string;

  @ApiProperty({
    description: "UUID of the applicant's user profile",
    format: "uuid",
    example: "550e8400-e29b-41d4-a716-446655440001",
  })
  @IsNotEmpty({ message: "applicant_profile_id is required" })
  @IsUUID(undefined, {
    message: "applicant_profile_id must be a valid UUID",
  })
  applicant_profile_id!: string;

  @ApiProperty({
    description: "Message explaining the applicant's interest",
    example: "I have experience with the required research methods.",
  })
  @IsNotEmpty({ message: "applicant_message is required" })
  @IsString({ message: "applicant_message must be a string" })
  applicant_message!: string;

  @ApiProperty({
    description: "UUID of a contact belonging to the applicant's profile",
    format: "uuid",
    example: "550e8400-e29b-41d4-a716-446655440002",
  })
  @IsNotEmpty({ message: "applicant_contact_id is required" })
  @IsUUID(undefined, {
    message: "applicant_contact_id must be a valid UUID",
  })
  applicant_contact_id!: string;
}

export class UpdateCollabApplicationDto {
  @ApiPropertyOptional({
    description: "Updated application message",
    example: "I can contribute my data analysis experience.",
  })
  @IsOptional()
  @IsNotEmpty({ message: "applicant_message cannot be empty" })
  @IsString({ message: "applicant_message must be a string" })
  applicant_message?: string;

  @ApiPropertyOptional({
    description: "Updated application status",
    enum: ApplicationStatus,
    example: ApplicationStatus.ACCEPTED,
  })
  @IsOptional()
  @IsEnum(ApplicationStatus, {
    message:
      "application_status must be Pending, Accepted, Rejected, Withdrawn, or Recruited",
  })
  application_status?: ApplicationStatus;
}