import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards} from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import { JwtGuard } from "@/common/guard/jwt.guard";
import { RolesGuard } from "@/common/guard/roles.guard";
import { Roles } from "@/common/decorators/user-role.decorator";
import { UserRole } from "@/common/enums/user-role.enum";
import { CreateUserLinkedProfileDto, UpdateUserLinkedProfileDto } from "./dto/user_linked_profile.dto";
import { UserLinkedProfileService } from "./user_linked_profile.service";

@ApiTags("User Linked Profiles")
@ApiBearerAuth()
@Controller("user-linked-profiles")
export class UserLinkedProfileController {
  constructor(
    private readonly userLinkedProfileService: UserLinkedProfileService,
  ) {}
  // Get
  @ApiOperation({
    summary: "Get all linked profiles",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid bearer token",
  })
  @ApiForbiddenResponse({
    description: "User role is not permitted",
  })
  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getUserLinkedProfiles() {
    return await this.userLinkedProfileService.getUserLinkedProfiles();
  }
  // Get by ID
  @ApiOperation({
    summary: "Get a linked profile by ID",
  })
  @ApiParam({
    name: "id",
    required: true,
    description: "UUID of the linked profile",
    example: "550e8400-e29b-41d4-a716-446655440002",
  })
  @ApiBadRequestResponse({
    description: "ID must be a valid UUID",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid bearer token",
  })
  @ApiForbiddenResponse({
    description: "Limited access to User and Admin roles",
  })
  @ApiNotFoundResponse({
    description: "User linked profile not found",
  })
  @Get(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  async getUserLinkedProfileById(@Param("id", ParseUUIDPipe) id: string) {
    return await this.userLinkedProfileService.getUserLinkedProfileById(id);
  }
  // Post
  @ApiOperation({
    summary: "Create a linked profile",
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
  async createUserLinkedProfile(@Body() dto: CreateUserLinkedProfileDto) {
    return await this.userLinkedProfileService.createUserLinkedProfile(dto);
  }
  // Patch
  @ApiOperation({
    summary: "Update a linked profile",
  })
  @ApiParam({
    name: "id",
    required: true,
    description: "UUID of the linked profile",
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
    description: "User linked profile not found",
  })
  @Patch(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  async updateUserLinkedProfile(@Param("id", ParseUUIDPipe) id: string, @Body() dto: UpdateUserLinkedProfileDto) {
    return await this.userLinkedProfileService.updateUserLinkedProfile(id, dto);
  }
  // Delete
  @ApiOperation({
    summary: "Delete a linked profile",
  })
  @ApiParam({
    name: "id",
    required: true,
    description: "UUID of the linked profile",
    example: "550e8400-e29b-41d4-a716-446655440002",
  })
  @ApiBadRequestResponse({
    description: "ID must be a valid UUID",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid bearer token",
  })
  @ApiForbiddenResponse({
    description: "User role is not permitted",
  })
  @ApiNotFoundResponse({
    description: "User linked profile not found",
  })
  @Delete(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  async deleteUserLinkedProfile(@Param("id", ParseUUIDPipe) id: string) {
    return await this.userLinkedProfileService.deleteUserLinkedProfile(id);
  }
}