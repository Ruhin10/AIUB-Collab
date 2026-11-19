import {IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ContactVia } from "../../../common/enums/contact-via.enum";

export class CreateUserProfileContactDto {
    @ApiProperty({
        description: "UUID of the user profile that owns this contact",
        format: "uuid",
        example: "550e8400-e29b-41d4-a716-446655440000",
    })
    @IsNotEmpty({ message: "user_profile_id is required" })
    @IsUUID(undefined, {
        message: "user_profile_id must be a valid UUID",
    })
    user_profile_id!: string;

    @ApiProperty({
        description: "Contact channel",
        enum: ContactVia,
        example: ContactVia.EMAIL,
    })
    @IsNotEmpty({ message: "contact_via is required" })
    @IsEnum(ContactVia, {
        message:
            "contact_via must be Email, Phone, LinkedIn, WhatsApp, Telegram, or Other",
    })
    contact_via!: ContactVia;

    @ApiProperty({
        description: "Contact address or identifier",
        example: "student@example.com",
    })
    @IsNotEmpty({ message: "contact_value is required" })
    @IsString({ message: "contact_value must be a string" })
    contact_value!: string;
}

export class UpdateUserProfileContactDto {
    @ApiPropertyOptional({
        description: "Updated contact channel",
        enum: ContactVia,
        example: ContactVia.LINKEDIN,
    })
    @IsOptional()
    @IsEnum(ContactVia, {
        message:
            "contact_via must be Email, Phone, LinkedIn, WhatsApp, Telegram, or Other",
    })
    contact_via?: ContactVia;

    @ApiPropertyOptional({
        description: "Updated contact address or identifier",
        example: "https://linkedin.com/in/example",
    })
    @IsOptional()
    @IsString({ message: "contact_value must be a string" })
    @IsNotEmpty({ message: "contact_value must not be empty" })
    contact_value?: string;
}