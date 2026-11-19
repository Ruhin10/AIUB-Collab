import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import{DepartmentService} from "./department.service";
import { CreateDepartmentDto, UpdateDepartmentDto } from "./dto/department.dto";
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

@ApiTags("Departments")
@ApiBearerAuth()
@Controller("departments")
export class DepartmentController {

    constructor(private readonly departmentService: DepartmentService) {}

    @Get()
    @ApiOperation({
        summary: "Get all departments",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin or User role is permitted",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getDepartments() {
        return await this.departmentService.getDepartments();
    }

    @Get(":id")
    @ApiOperation({
        summary: "Get a department by ID",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the department",
        example: "550e8400-e29b-41d4-a716-446655440006",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin or User role is permitted",
    })
    @ApiNotFoundResponse({
        description: "Department not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getDepartmentsById(@Param("id") id: string) {
        return await this.departmentService.getDepartmentsById(id);
    }

    @Post()
    @ApiOperation({
        summary: "Create a department",
    })
    @ApiBadRequestResponse({
        description: "Invalid department data",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin role is permitted",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async createDepartment(@Body() dto: CreateDepartmentDto) {
        return await this.departmentService.createDepartment(dto);
    }
    
    @Patch(":id")
    @ApiOperation({
        summary: "Update a department",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the department",
        example: "550e8400-e29b-41d4-a716-446655440006",
    })
    @ApiBadRequestResponse({
        description: "Invalid department update data",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin role is permitted",
    })
    @ApiNotFoundResponse({
        description: "Department not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async updateDepartment(@Param("id") id: string, @Body() dto: UpdateDepartmentDto) {
        return await this.departmentService.updateDepartment(id, dto);
    }

    @Delete(":id")
    @ApiOperation({
        summary: "Delete a department",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the department",
        example: "550e8400-e29b-41d4-a716-446655440006",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin role is permitted",
    })
    @ApiNotFoundResponse({
        description: "Department not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async deleteDepartment(@Param("id") id: string) {
        return await this.departmentService.deleteDepartment(id);
    }

}