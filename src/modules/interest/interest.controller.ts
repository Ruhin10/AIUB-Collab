import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import{InterestService} from "./interest.service";
import { CreateInterestDto, UpdateInterestDto } from "./dto/interest.dto";
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

@ApiTags("Interests")
@ApiBearerAuth()
@Controller("interests")
export class InterestController {

    constructor(private readonly interestService: InterestService) {}

    @Get()
    @ApiOperation({
        summary: "Get all interests",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin or User role is permitted",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getInterests() {
        return await this.interestService.getInterests();
    }

    @Get(":id")
    @ApiOperation({
        summary: "Get an interest by ID",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the interest",
        example: "550e8400-e29b-41d4-a716-446655440009",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin or User role is permitted",
    })
    @ApiNotFoundResponse({
        description: "Interest not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getInterestsById(@Param("id") id: string) {
        return await this.interestService.getInterestsById(id);
    }

    @Post()
    @ApiOperation({
        summary: "Create an interest",
    })
    @ApiBadRequestResponse({
        description: "Invalid interest data",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin role is permitted",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async createInterest(@Body() dto: CreateInterestDto) {
        return await this.interestService.createInterest(dto);
    }
    
    @Patch(":id")
    @ApiOperation({
        summary: "Update an interest",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the interest",
        example: "550e8400-e29b-41d4-a716-446655440009",
    })
    @ApiBadRequestResponse({
        description: "Invalid interest update data",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin role is permitted",
    })
    @ApiNotFoundResponse({
        description: "Interest not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async updateInterest(@Param("id") id: string, @Body() dto: UpdateInterestDto) {
        return await this.interestService.updateInterest(id, dto);
    }

    @Delete(":id")
    @ApiOperation({
        summary: "Delete an interest",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the interest",
        example: "550e8400-e29b-41d4-a716-446655440009",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin role is permitted",
    })
    @ApiNotFoundResponse({
        description: "Interest not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async deleteInterest(@Param("id") id: string) {
        return await this.interestService.deleteInterest(id);
    }

}