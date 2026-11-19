import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import{UserProfileService} from "./user_profile.service";
import { CreateUserProfileDto, UpdateUserProfileDto } from "./dto/user_profile.dto";
import { JwtGuard } from "../../common/guard/jwt.guard";
import { RolesGuard } from "../../common/guard/roles.guard";
import { Roles } from "../../common/decorators/user-role.decorator";
import { UserRole } from "../../common/enums/user-role.enum";
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

@ApiTags("User Profiles")
@ApiBearerAuth()
@Controller("user-profiles")
export class UserProfileController {

    constructor(private readonly userProfileService: UserProfileService) {}

    @Get()
    @ApiOperation({
        summary: "Get all user profiles",
        description: "Returns user profiles with their department, user, skills, and interests.",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin role is permitted",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async getUserProfiles() {
        return await this.userProfileService.getUserProfiles();
    }

    @Get(":id")
    @ApiOperation({
        summary: "Get a user profile by ID",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the user profile",
        example: "550e8400-e29b-41d4-a716-446655440005",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin or User role is permitted",
    })
    @ApiNotFoundResponse({
        description: "User profile not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getUserProfilesById(@Param("id") id: string) {
        return await this.userProfileService.getUserProfilesById(id);
    }

    @Post()
    @ApiOperation({
        summary: "Create a user profile",
    })
    @ApiBadRequestResponse({
        description: "Invalid user profile data",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only User role is permitted",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
    async createUserProfile(@Body() dto: CreateUserProfileDto) {
        return await this.userProfileService.createUserProfile(dto);
    }
    
    @Patch(":id")
    @ApiOperation({
        summary: "Update a user profile",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the user profile",
        example: "550e8400-e29b-41d4-a716-446655440005",
    })
    @ApiBadRequestResponse({
        description: "Invalid user profile update data",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only User role is permitted",
    })
    @ApiNotFoundResponse({
        description: "User profile not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
    async updateUserProfile(@Param("id") id: string, @Body() dto: UpdateUserProfileDto) {
        return await this.userProfileService.updateUserProfile(id, dto);
    }

    @Delete(":id")
    @ApiOperation({
        summary: "Delete a user profile",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the user profile",
        example: "550e8400-e29b-41d4-a716-446655440005",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin or User role is permitted",
    })
    @ApiNotFoundResponse({
        description: "User profile not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async deleteUserProfile(@Param("id") id: string) {
        return await this.userProfileService.deleteUserProfile(id);
    }

}