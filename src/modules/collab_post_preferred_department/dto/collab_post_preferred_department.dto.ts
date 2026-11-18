import { IsNotEmpty, IsUUID, ValidateIf } from "class-validator";

export class CreateCollabPostPreferredDepartmentDto {
  @IsNotEmpty({ message: "collab_post_id is required" })
  @IsUUID(undefined, {
    message: "collab_post_id must be a valid UUID",
  })
  collab_post_id!: string;

  @IsNotEmpty({ message: "department_id is required" })
  @IsUUID(undefined, {
    message: "department_id must be a valid UUID",
  })
  department_id!: string;
}

export class UpdateCollabPostPreferredDepartmentDto {
  @ValidateIf((_object, value) => value !== undefined)
  @IsUUID(undefined, {
    message: "collab_post_id must be a valid UUID",
  })
  collab_post_id?: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsUUID(undefined, {
    message: "department_id must be a valid UUID",
  })
  department_id?: string;
}