import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import{SkillService} from "./skill.service";
import { CreateSkillDto, UpdateSkillDto } from "./dto/skill.dto";
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

@ApiTags("Skills")
@ApiBearerAuth()
@Controller("skills")
export class SkillController {

    constructor(private readonly skillService: SkillService) {}

    @Get()
    @ApiOperation({
        summary: "Get all skills",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin or User role is permitted",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getSkills() {
        return await this.skillService.getSkills();
    }

    @Get(":id")
    @ApiOperation({
        summary: "Get a skill by ID",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the skill",
        example: "550e8400-e29b-41d4-a716-446655440007",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin or User role is permitted",
    })
    @ApiNotFoundResponse({
        description: "Skill not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getSkillsById(@Param("id") id: string) {
        return await this.skillService.getSkillsById(id);
    }

    @Post()
    @ApiOperation({
        summary: "Create a skill",
    })
    @ApiBadRequestResponse({
        description: "Invalid skill data",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin role is permitted",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async createSkill(@Body() dto: CreateSkillDto) {
        return await this.skillService.createSkill(dto);
    }
    
    @Patch(":id")
    @ApiOperation({
        summary: "Update a skill",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the skill",
        example: "550e8400-e29b-41d4-a716-446655440007",
    })
    @ApiBadRequestResponse({
        description: "Invalid skill update data",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin role is permitted",
    })
    @ApiNotFoundResponse({
        description: "Skill not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async updateSkill(@Param("id") id: string, @Body() dto: UpdateSkillDto) {
        return await this.skillService.updateSkill(id, dto);
    }

    @Delete(":id")
    @ApiOperation({
        summary: "Delete a skill",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the skill",
        example: "550e8400-e29b-41d4-a716-446655440007",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin role is permitted",
    })
    @ApiNotFoundResponse({
        description: "Skill not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async deleteSkill(@Param("id") id: string) {
        return await this.skillService.deleteSkill(id);
    }

}