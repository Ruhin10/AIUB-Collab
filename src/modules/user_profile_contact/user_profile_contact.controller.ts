import {Body,Controller,Delete,Get,Param,Patch,Post, UseGuards,} from "@nestjs/common";
import { UserProfileContactService } from "./user_profile_contact.service";
import {CreateUserProfileContactDto, UpdateUserProfileContactDto} from "./dto/user_profile_contact.dto";
import { RolesGuard } from "@/src/common/guard/roles.guard";
import { JwtGuard } from "@/src/common/guard/jwt.guard";
import { UserRole } from "@/src/common/enums/user-role.enum";
import { Roles } from "@/src/common/decorators/user-role.decorator";
import { AuthUser} from "@/common/interfaces/auth-user.interface";
import { CurrentUser } from "@/common/decorators/current-user.decorator";
import {ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";

@ApiTags("User Profile Contacts")
@ApiBearerAuth()

@Controller("user-profile-contacts")
export class UserProfileContactController {
    constructor(
        private readonly userProfileContactService: UserProfileContactService,
    ) {}
    // Get 
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({
        summary: "Get all user profile contacts",
        description: "Returns profile contacts with their user profile relation.",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "User role is not permitted",
    })
    @Get()
    async getUserProfileContacts() {
        return await this.userProfileContactService.getUserProfileContacts();
    }
    // Get by ID
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiOperation({
        summary: "Get a user profile contact by ID",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the user profile contact",
        example: "550e8400-e29b-41d4-a716-446655440001",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Sign in to view this resource",
    })
    @ApiNotFoundResponse({
        description: "User profile contact not found",
    })
    @Get(":id")
    async getUserProfileContactById(@Param("id") id: string) {
        return await this.userProfileContactService.getUserProfileContactById(id);
    }
    // Post
    @UseGuards(JwtGuard, RolesGuard)
    @Roles( UserRole.USER )
    @ApiOperation({
        summary: "Create a user profile contact",
    })
    @ApiBadRequestResponse({
        description: "Invalid contact data",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Admin role is not permitted",
    })
    @Post()
    async createUserProfileContact(@CurrentUser() user: AuthUser,@Body() dto: CreateUserProfileContactDto) {
        return await this.userProfileContactService.createUserProfileContact(dto, user);
    }
    // Patch
    @UseGuards(JwtGuard, RolesGuard)
    @Roles( UserRole.USER )   
    @ApiOperation({
        summary: "Update a user profile contact",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the user profile contact",
        example: "550e8400-e29b-41d4-a716-446655440001",
    })
    @ApiBadRequestResponse({
        description: "Invalid contact update data",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Admin role is not permitted",
    })
    @ApiNotFoundResponse({
        description: "User profile contact not found",
    })
    @Patch(":id")
    async updateUserProfileContact(@Param("id") id: string, @CurrentUser() user: AuthUser, @Body() dto: UpdateUserProfileContactDto,) {
        return await this.userProfileContactService.updateUserProfileContact(id, dto, user);
    }
    // Delete
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiOperation({
        summary: "Delete a user profile contact",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the user profile contact",
        example: "550e8400-e29b-41d4-a716-446655440001",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Limited Access Only to User and Admin.",
    })
    @ApiNotFoundResponse({
        description: "User profile contact not found",
    })
    @Delete(":id")
    async deleteUserProfileContact(@Param("id") id: string, @CurrentUser() user: AuthUser) {
        return await this.userProfileContactService.deleteUserProfileContact(id, user);
    }
}