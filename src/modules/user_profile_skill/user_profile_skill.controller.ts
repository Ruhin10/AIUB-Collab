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

@Controller("user-profile-skills")
export class UserProfileSkillController {
    constructor(
        private readonly userProfileSkillService: UserProfileSkillService,
    ) {}

    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async getUserProfileSkills() {
        return await this.userProfileSkillService.getUserProfileSkills();
    }

    @Get(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getUserProfileSkillById(@Param("id") id: string) {
        return await this.userProfileSkillService.getUserProfileSkillById(id);
    }

    @Post()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
    async createUserProfileSkill(@Body() dto: CreateUserProfileSkillDto) {
        return await this.userProfileSkillService.createUserProfileSkill(dto);
    }

    @Patch(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
    async updateUserProfileSkill(
        @Param("id") id: string,
        @Body() dto: UpdateUserProfileSkillDto,
    ) {
        return await this.userProfileSkillService.updateUserProfileSkill(id, dto);
    }

    @Delete(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async deleteUserProfileSkill(@Param("id") id: string) {
        return await this.userProfileSkillService.deleteUserProfileSkill(id);
    }
}