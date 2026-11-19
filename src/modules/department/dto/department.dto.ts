import {
    IsNotEmpty,
    IsString,
    ValidateIf,
} from "class-validator";

export class CreateDepartmentDto {
    @IsNotEmpty({ message: "department_name is required" })
    @IsString({ message: "department_name must be a string" })
    department_name!: string;
}

export class UpdateDepartmentDto {
    @ValidateIf((_object, value) => value !== undefined)
    @IsNotEmpty({ message: "department_name cannot be empty" })
    @IsString({ message: "department_name must be a string" })
    department_name?: string;
}