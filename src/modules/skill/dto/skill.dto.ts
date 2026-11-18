import {
    IsNotEmpty,
    IsString,
    ValidateIf,
} from "class-validator";

export class CreateSkillDto {
    @IsNotEmpty({ message: "skill_name is required" })
    @IsString({ message: "skill_name must be a string" })
    skill_name!: string;
}

export class UpdateSkillDto {
    @ValidateIf((_object, value) => value !== undefined)
    @IsNotEmpty({ message: "skill_name cannot be empty" })
    @IsString({ message: "skill_name must be a string" })
    skill_name?: string;
}