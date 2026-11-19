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

@Controller("user-profile-interests")
export class UserProfileInterestController {

    constructor(private readonly userProfileInterestService: UserProfileInterestService) {}

    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async getUserProfileInterests() {
        return await this.userProfileInterestService.getUserProfileInterests();
    }

    @Get(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getUserProfileInterestsById(@Param("id") id: string) {
        return await this.userProfileInterestService.getUserProfileInterestsById(id);
    }

    @Post()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
    async createUserProfileInterest(@Body() dto: CreateUserProfileInterestDto) {
        return await this.userProfileInterestService.createUserProfileInterest(dto);
    }
    
    @Patch(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
    async updateUserProfileInterest(@Param("id") id: string, @Body() dto: UpdateUserProfileInterestDto) {
        return await this.userProfileInterestService.updateUserProfileInterest(id, dto);
    }

    @Delete(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async deleteUserProfileInterest(@Param("id") id: string) {
        return await this.userProfileInterestService.deleteUserProfileInterest(id);
    }

}