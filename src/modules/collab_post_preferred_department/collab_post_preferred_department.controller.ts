import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  CreateCollabPostPreferredDepartmentDto,
  UpdateCollabPostPreferredDepartmentDto,
} from "./dto/collab_post_preferred_department.dto";
import { CollabPostPreferredDepartmentService } from "./collab_post_preferred_department.service";
import { UserRole } from "@/src/common/enums/user-role.enum";
import { Roles } from "@/src/common/decorators/user-role.decorator";
import { RolesGuard } from "@/src/common/guard/roles.guard";
import { JwtGuard } from "@/src/common/guard/jwt.guard";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

@ApiTags("Collaboration Post Preferred Departments")
@ApiBearerAuth()
@Controller("collab-post-preferred-departments")
export class CollabPostPreferredDepartmentController {
  constructor(
    private readonly preferredDepartmentService: CollabPostPreferredDepartmentService,
  ) {}

  @ApiOperation({
    summary: "Get all preferred departments for collaboration posts",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid bearer token",
  })
  @ApiForbiddenResponse({
    description: "User role is not permitted",
  })
  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  getCollabPostPreferredDepartments() {
    return this.preferredDepartmentService.getCollabPostPreferredDepartments();
  }

  @ApiOperation({
    summary: "Get a preferred department by ID",
  })
  @ApiParam({
    name: "id",
    required: true,
    description: "UUID of the preferred-department record",
    example: "550e8400-e29b-41d4-a716-446655440002",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid bearer token",
  })
  @ApiForbiddenResponse({
    description: "User role is not permitted",
  })
  @ApiNotFoundResponse({
    description: "Preferred department not found",
  })
  @Get(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  getCollabPostPreferredDepartmentById(@Param("id") id: string) {
    return this.preferredDepartmentService.getCollabPostPreferredDepartmentById(
      id,
    );
  }

  @ApiOperation({
    summary: "Add a preferred department to a collaboration post",
  })
  @ApiBadRequestResponse({
    description: "Invalid collaboration post or department UUID",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid bearer token",
  })
  @ApiForbiddenResponse({
    description: "User role is not permitted",
  })
  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  createCollabPostPreferredDepartment(
    @Body() dto: CreateCollabPostPreferredDepartmentDto,
  ) {
    return this.preferredDepartmentService.createCollabPostPreferredDepartment(
      dto,
    );
  }

  @ApiOperation({
    summary: "Update a preferred department record",
  })
  @ApiParam({
    name: "id",
    required: true,
    description: "UUID of the preferred-department record",
    example: "550e8400-e29b-41d4-a716-446655440002",
  })
  @ApiBadRequestResponse({
    description: "Invalid collaboration post or department UUID",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid bearer token",
  })
  @ApiForbiddenResponse({
    description: "User role is not permitted",
  })
  @ApiNotFoundResponse({
    description: "Preferred department not found",
  })
  @Patch(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  updateCollabPostPreferredDepartment(
    @Param("id") id: string,
    @Body() dto: UpdateCollabPostPreferredDepartmentDto,
  ) {
    return this.preferredDepartmentService.updateCollabPostPreferredDepartment(
      id,
      dto,
    );
  }

  @ApiOperation({
    summary: "Delete a preferred department record",
  })
  @ApiParam({
    name: "id",
    required: true,
    description: "UUID of the preferred-department record",
    example: "550e8400-e29b-41d4-a716-446655440002",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid bearer token",
  })
  @ApiForbiddenResponse({
    description: "User role is not permitted",
  })
  @ApiNotFoundResponse({
    description: "Preferred department not found",
  })
  @Delete(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  deleteCollabPostPreferredDepartment(@Param("id") id: string) {
    return this.preferredDepartmentService.deleteCollabPostPreferredDepartment(
      id,
    );
  }
}