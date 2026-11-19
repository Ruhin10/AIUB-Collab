import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards} from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtGuard } from "@/common/guard/jwt.guard";
import { RolesGuard } from "@/common/guard/roles.guard";
import { Roles } from "@/common/decorators/user-role.decorator";
import { UserRole } from "@/common/enums/user-role.enum";
import { CreateCollabPostPreferredAcademicIdentityDto, UpdateCollabPostPreferredAcademicIdentityDto } from "./dto/collab_post_preferred_academic_identity.dto";
import { CollabPostPreferredAcademicIdentityService } from "./collab_post_preferred_academic_identity.service";

@ApiTags("Collaboration Post Preferred Academic Identities")
@ApiBearerAuth()
@Controller("collab-post-preferred-academic-identities")
export class CollabPostPreferredAcademicIdentityController {
  constructor(
    private readonly collabPostPreferredAcademicIdentityService: CollabPostPreferredAcademicIdentityService,
  ) {}
  // Get
  @ApiOperation({
    summary: "Get all preferred academic identities",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid bearer token",
  })
  @ApiForbiddenResponse({
    description: "Limited Access to Admins and Users",
  })
  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  async getAll() {
    return await this.collabPostPreferredAcademicIdentityService.getAll();
  }
  // Get by ID
  @ApiOperation({
    summary: "Get a preferred academic identity by ID",
  })
  @ApiParam({
    name: "id",
    required: true,
    description: "UUID of the preferred academic identity",
    example: "550e8400-e29b-41d4-a716-446655440002",
  })
  @ApiBadRequestResponse({
    description: "ID must be a valid UUID",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid bearer token",
  })
  @ApiForbiddenResponse({
    description: "Admin role is not permitted",
  })
  @ApiNotFoundResponse({
    description: "Preferred academic identity not found",
  })
  @Get(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  async getById(@Param("id", ParseUUIDPipe) id: string) {
    return await this.collabPostPreferredAcademicIdentityService.getById(id);
  }
  // Post
  @ApiOperation({
    summary: "Create a preferred academic identity",
  })
  @ApiBadRequestResponse({
    description: "Invalid request data",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid bearer token",
  })
  @ApiForbiddenResponse({
    description: "Admin role is not permitted",
  })
  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  async create( @Body() dto: CreateCollabPostPreferredAcademicIdentityDto) {
    return await this.collabPostPreferredAcademicIdentityService.create(dto);
  }
  // Patch
  @ApiOperation({
    summary: "Update a preferred academic identity",
  })
  @ApiParam({
    name: "id",
    required: true,
    description: "UUID of the preferred academic identity",
    example: "550e8400-e29b-41d4-a716-446655440002",
  })
  @ApiBadRequestResponse({
    description: "Invalid ID or request data",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid bearer token",
  })
  @ApiForbiddenResponse({
    description: "Admin role is not permitted",
  })
  @ApiNotFoundResponse({
    description: "Preferred academic identity not found",
  })
  @Patch(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  async update( @Param("id", ParseUUIDPipe) id: string, @Body() dto: UpdateCollabPostPreferredAcademicIdentityDto) {
    return await this.collabPostPreferredAcademicIdentityService.update( id, dto );
  }
  // Delete
  @ApiOperation({
    summary: "Delete a preferred academic identity",
  })
  @ApiParam({
    name: "id",
    required: true,
    description: "UUID of the preferred academic identity",
    example: "550e8400-e29b-41d4-a716-446655440002",
  })
  @ApiBadRequestResponse({
    description: "ID must be a valid UUID",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid bearer token",
  })
  @ApiForbiddenResponse({
    description: "Admin role is not permitted",
  })
  @ApiNotFoundResponse({
    description: "Preferred academic identity not found",
  })
  @Delete(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  async delete(@Param("id", ParseUUIDPipe) id: string) {
    return await this.collabPostPreferredAcademicIdentityService.delete(id);
  }
}