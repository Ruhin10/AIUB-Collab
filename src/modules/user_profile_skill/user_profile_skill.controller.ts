import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserProfileSkillService } from "./user_profile_skill.service";
import {
    CreateUserProfileSkillDto,
    UpdateUserProfileSkillDto,
} from "./dto/user_profile_skill.dto";
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

@ApiTags("User Profile Skills")
@ApiBearerAuth()
@Controller("user-profile-skills")
export class UserProfileSkillController {
    constructor(
        private readonly userProfileSkillService: UserProfileSkillService,
    ) {}

    @Get()
    @ApiOperation({
        summary: "Get all user profile skills",
        description: "Returns user profile skill associations with their profile and skill relations.",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin role is permitted",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async getUserProfileSkills() {
        return await this.userProfileSkillService.getUserProfileSkills();
    }

    @Get(":id")
    @ApiOperation({
        summary: "Get a user profile skill by ID",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the user profile skill",
        example: "550e8400-e29b-41d4-a716-446655440008",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin or User role is permitted",
    })
    @ApiNotFoundResponse({
        description: "User profile skill not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getUserProfileSkillById(@Param("id") id: string) {
        return await this.userProfileSkillService.getUserProfileSkillById(id);
    }

    @Post()
    @ApiOperation({
        summary: "Create a user profile skill",
    })
    @ApiBadRequestResponse({
        description: "Invalid user profile skill data",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only User role is permitted",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
    async createUserProfileSkill(@Body() dto: CreateUserProfileSkillDto) {
        return await this.userProfileSkillService.createUserProfileSkill(dto);
    }

    @Patch(":id")
    @ApiOperation({
        summary: "Update a user profile skill",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the user profile skill",
        example: "550e8400-e29b-41d4-a716-446655440008",
    })
    @ApiBadRequestResponse({
        description: "Invalid user profile skill update data",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only User role is permitted",
    })
    @ApiNotFoundResponse({
        description: "User profile skill not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
    async updateUserProfileSkill(
        @Param("id") id: string,
        @Body() dto: UpdateUserProfileSkillDto,
    ) {
        return await this.userProfileSkillService.updateUserProfileSkill(id, dto);
    }

    @Delete(":id")
    @ApiOperation({
        summary: "Delete a user profile skill",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the user profile skill",
        example: "550e8400-e29b-41d4-a716-446655440008",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin or User role is permitted",
    })
    @ApiNotFoundResponse({
        description: "User profile skill not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async deleteUserProfileSkill(@Param("id") id: string) {
        return await this.userProfileSkillService.deleteUserProfileSkill(id);
    }
}