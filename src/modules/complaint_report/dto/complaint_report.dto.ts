import { IsEnum, IsNotEmpty, IsOptional, IsUUID, IsString} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ReportReason } from "../../../common/enums/report-reason.enum";
import { ReportStatus } from "../../../common/enums/report-status.enum";

export class CreateComplaintReportDto {
    @ApiProperty({
        description: "UUID of the user submitting the report",
        format: "uuid",
        example: "550e8400-e29b-41d4-a716-446655440000",
    })
    @IsNotEmpty({ message: "reporter_id is required" })
    @IsUUID(undefined, {
        message: "reporter_id must be a valid UUID",
    })
    reporter_id!: string;

    @ApiPropertyOptional({
        description: "UUID of the user being reported",
        format: "uuid",
        example: "550e8400-e29b-41d4-a716-446655440001",
        nullable: true,
    })
    @IsOptional()
    @IsUUID(undefined, {
        message: "reported_user_id must be a valid UUID",
    })
    reported_user_id?: string | null;

    @ApiPropertyOptional({
        description: "UUID of the collaboration post being reported",
        format: "uuid",
        example: "550e8400-e29b-41d4-a716-446655440002",
        nullable: true,
    })
    @IsOptional()
    @IsUUID(undefined, {
        message: "collab_post_id must be a valid UUID",
    })
    collab_post_id?: string | null;

    @ApiProperty({
        description: "Reason for the complaint",
        enum: ReportReason,
        example: ReportReason.HARASSMENT,
    })
    @IsNotEmpty({ message: "reason is required" })
    @IsEnum(ReportReason, {
        message:
            "reason must be Harassment, Spam, Fraud, Misleading_Information, Inappropriate_Content, or Other",
    })
    reason!: ReportReason;

    @ApiPropertyOptional({
        description: "Additional details about the complaint",
        example: "The post contains repeated unsolicited promotional links.",
        nullable: true,
    })
    @IsOptional()
    @IsString({
        message: "description must be a string",
    })
    description?: string | null;
}

export class UpdateComplaintReportDto {
    @ApiPropertyOptional({
        description: "Updated review status of the complaint",
        enum: ReportStatus,
        example: ReportStatus.UNDER_REVIEW,
    })
    @IsOptional()
    @IsEnum(ReportStatus, {
        message:
            "report_status must be Submitted, Under Review, Resolved, or Rejected",
    })
    report_status?: ReportStatus;

    @ApiPropertyOptional({
        description: "UUID of the administrator reviewing the complaint",
        format: "uuid",
        example: "550e8400-e29b-41d4-a716-446655440003",
    })
    @IsOptional()
    @IsUUID(undefined, {
        message: "reviewed_by_admin_id must be a valid UUID",
    })
    reviewed_by_admin_id?: string;
}