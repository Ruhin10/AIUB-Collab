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
import { CollabApplicationService } from "./collab_application.service";
import {
  CreateCollabApplicationDto,
  UpdateCollabApplicationDto,
} from "./dto/collab_application.dto";
import { JwtGuard } from "@/common/guard/jwt.guard";
import { RolesGuard } from "@/common/guard/roles.guard";
import { Roles } from "@/common/decorators/user-role.decorator";
import { UserRole } from "@/common/enums/user-role.enum";
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

@ApiTags("Collaboration Applications")
@ApiBearerAuth()
@Controller("collab-applications")
export class CollabApplicationController {
  constructor(
    private readonly collabApplicationService: CollabApplicationService,
  ) {}

  @ApiOperation({
    summary: "Get all collaboration applications",
    description:
      "Returns collaboration applications with their post, applicant profile, and contact.",
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
  async getCollabApplications() {
    return this.collabApplicationService.getCollabApplications();
  }

  @ApiOperation({
    summary: "Get a collaboration application by ID",
  })
  @ApiParam({
    name: "id",
    required: true,
    description: "UUID of the collaboration application",
    example: "550e8400-e29b-41d4-a716-446655440002",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid bearer token",
  })
  @ApiForbiddenResponse({
    description: "User role is not permitted",
  })
  @ApiNotFoundResponse({
    description: "Collaboration application not found",
  })
  @Get(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  async getCollabApplicationById(@Param("id") id: string) {
    return this.collabApplicationService.getCollabApplicationById(id);
  }

  @ApiOperation({
    summary: "Create a collaboration application",
  })
  @ApiBadRequestResponse({
    description: "Invalid collaboration application data",
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
  async createCollabApplication(@Body() dto: CreateCollabApplicationDto) {
    return this.collabApplicationService.createCollabApplication(dto);
  }

  @ApiOperation({
    summary: "Update a collaboration application",
  })
  @ApiParam({
    name: "id",
    required: true,
    description: "UUID of the collaboration application",
    example: "550e8400-e29b-41d4-a716-446655440002",
  })
  @ApiBadRequestResponse({
    description: "Invalid update data",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid bearer token",
  })
  @ApiForbiddenResponse({
    description: "User role is not permitted",
  })
  @ApiNotFoundResponse({
    description: "Collaboration application not found",
  })
  @Patch(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  async updateCollabApplication(
    @Param("id") id: string,
    @Body() dto: UpdateCollabApplicationDto,
  ) {
    return this.collabApplicationService.updateCollabApplication(id, dto);
  }

  @ApiOperation({
    summary: "Delete a collaboration application",
  })
  @ApiParam({
    name: "id",
    required: true,
    description: "UUID of the collaboration application",
    example: "550e8400-e29b-41d4-a716-446655440002",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid bearer token",
  })
  @ApiForbiddenResponse({
    description: "User role is not permitted",
  })
  @ApiNotFoundResponse({
    description: "Collaboration application not found",
  })
  @Delete(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  async deleteCollabApplication(@Param("id") id: string) {
    return this.collabApplicationService.deleteCollabApplication(id);
  }
}
