import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import{UserProfileService} from "./user_profile.service";
import { CreateUserProfileDto, UpdateUserProfileDto } from "./dto/user_profile.dto";
import { JwtGuard } from "../../common/guard/jwt.guard";
import { RolesGuard } from "../../common/guard/roles.guard";
import { Roles } from "../../common/decorators/user-role.decorator";
import { UserRole } from "../../common/enums/user-role.enum";

@Controller("user-profiles")
export class UserProfileController {

    constructor(private readonly userProfileService: UserProfileService) {}

    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async getUserProfiles() {
        return await this.userProfileService.getUserProfiles();
    }

    @Get(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getUserProfilesById(@Param("id") id: string) {
        return await this.userProfileService.getUserProfilesById(id);
    }

    @Post()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
    async createUserProfile(@Body() dto: CreateUserProfileDto) {
        return await this.userProfileService.createUserProfile(dto);
    }
    
    @Patch(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
    async updateUserProfile(@Param("id") id: string, @Body() dto: UpdateUserProfileDto) {
        return await this.userProfileService.updateUserProfile(id, dto);
    }

    @Delete(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async deleteUserProfile(@Param("id") id: string) {
        return await this.userProfileService.deleteUserProfile(id);
    }

}