import {
    IsNotEmpty,
    IsString,
    ValidateIf,
} from "class-validator";

export class CreateInterestDto {
    @IsNotEmpty({ message: "interest_name is required" })
    @IsString({ message: "interest_name must be a string" })
    interest_name!: string;
}

export class UpdateInterestDto {
    @ValidateIf((_object, value) => value !== undefined)
    @IsNotEmpty({ message: "interest_name cannot be empty" })
    @IsString({ message: "interest_name must be a string" })
    interest_name?: string;
}