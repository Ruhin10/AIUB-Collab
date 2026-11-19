import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import{SkillService} from "./skill.service";
import { CreateSkillDto, UpdateSkillDto } from "./dto/skill.dto";
import { JwtGuard } from "../../common/guard/jwt.guard";
import { RolesGuard } from "../../common/guard/roles.guard";
import { Roles } from "../../common/decorators/user-role.decorator";
import { UserRole } from "../../common/enums/user-role.enum";

@Controller("skills")
export class SkillController {

    constructor(private readonly skillService: SkillService) {}

    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getSkills() {
        return await this.skillService.getSkills();
    }

    @Get(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getSkillsById(@Param("id") id: string) {
        return await this.skillService.getSkillsById(id);
    }

    @Post()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async createSkill(@Body() dto: CreateSkillDto) {
        return await this.skillService.createSkill(dto);
    }
    
    @Patch(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async updateSkill(@Param("id") id: string, @Body() dto: UpdateSkillDto) {
        return await this.skillService.updateSkill(id, dto);
    }

    @Delete(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async deleteSkill(@Param("id") id: string) {
        return await this.skillService.deleteSkill(id);
    }

}