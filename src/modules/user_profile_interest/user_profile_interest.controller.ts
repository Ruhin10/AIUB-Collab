import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import{UserProfileInterestService} from "./user_profile_interest.service";
import {
    CreateUserProfileInterestDto,
    UpdateUserProfileInterestDto,
} from "./dto/user_profile_interest.dto";
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

@ApiTags("User Profile Interests")
@ApiBearerAuth()
@Controller("user-profile-interests")
export class UserProfileInterestController {

    constructor(private readonly userProfileInterestService: UserProfileInterestService) {}

    @Get()
    @ApiOperation({
        summary: "Get all user profile interests",
        description: "Returns user profile interest associations with their profile and interest relations.",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin role is permitted",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async getUserProfileInterests() {
        return await this.userProfileInterestService.getUserProfileInterests();
    }

    @Get(":id")
    @ApiOperation({
        summary: "Get a user profile interest by ID",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the user profile interest",
        example: "550e8400-e29b-41d4-a716-446655440010",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin or User role is permitted",
    })
    @ApiNotFoundResponse({
        description: "User profile interest not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getUserProfileInterestsById(@Param("id") id: string) {
        return await this.userProfileInterestService.getUserProfileInterestsById(id);
    }

    @Post()
    @ApiOperation({
        summary: "Create a user profile interest",
    })
    @ApiBadRequestResponse({
        description: "Invalid user profile interest data",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only User role is permitted",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
    async createUserProfileInterest(@Body() dto: CreateUserProfileInterestDto) {
        return await this.userProfileInterestService.createUserProfileInterest(dto);
    }
    
    @Patch(":id")
    @ApiOperation({
        summary: "Update a user profile interest",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the user profile interest",
        example: "550e8400-e29b-41d4-a716-446655440010",
    })
    @ApiBadRequestResponse({
        description: "Invalid user profile interest update data",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only User role is permitted",
    })
    @ApiNotFoundResponse({
        description: "User profile interest not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
    async updateUserProfileInterest(@Param("id") id: string, @Body() dto: UpdateUserProfileInterestDto) {
        return await this.userProfileInterestService.updateUserProfileInterest(id, dto);
    }

    @Delete(":id")
    @ApiOperation({
        summary: "Delete a user profile interest",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the user profile interest",
        example: "550e8400-e29b-41d4-a716-446655440010",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin or User role is permitted",
    })
    @ApiNotFoundResponse({
        description: "User profile interest not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async deleteUserProfileInterest(@Param("id") id: string) {
        return await this.userProfileInterestService.deleteUserProfileInterest(id);
    }

}