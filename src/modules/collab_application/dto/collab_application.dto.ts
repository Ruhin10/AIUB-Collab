import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { ApplicationStatus } from "../../../common/enums/application-status.enum";

export class CreateCollabApplicationDto {
  @IsNotEmpty({ message: "collab_post_id is required" })
  @IsUUID(undefined, { message: "collab_post_id must be a valid UUID" })
  collab_post_id!: string;

  @IsNotEmpty({ message: "applicant_profile_id is required" })
  @IsUUID(undefined, {
    message: "applicant_profile_id must be a valid UUID",
  })
  applicant_profile_id!: string;

  @IsNotEmpty({ message: "applicant_message is required" })
  @IsString({ message: "applicant_message must be a string" })
  applicant_message!: string;

  @IsNotEmpty({ message: "applicant_contact_id is required" })
  @IsUUID(undefined, {
    message: "applicant_contact_id must be a valid UUID",
  })
  applicant_contact_id!: string;
}

export class UpdateCollabApplicationDto {
  @IsOptional()
  @IsNotEmpty({ message: "applicant_message cannot be empty" })
  @IsString({ message: "applicant_message must be a string" })
  applicant_message?: string;

  @IsOptional()
  @IsEnum(ApplicationStatus, {
    message:
      "application_status must be Pending, Accepted, Rejected, Withdrawn, or Recruited",
  })
  application_status?: ApplicationStatus;
}