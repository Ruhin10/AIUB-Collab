import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import{DepartmentService} from "./department.service";
import { CreateDepartmentDto, UpdateDepartmentDto } from "./dto/department.dto";
import { JwtGuard } from "../../common/guard/jwt.guard";
import { RolesGuard } from "../../common/guard/roles.guard";
import { Roles } from "../../common/decorators/user-role.decorator";
import { UserRole } from "../../common/enums/user-role.enum";

@Controller("departments")
export class DepartmentController {

    constructor(private readonly departmentService: DepartmentService) {}

    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getDepartments() {
        return await this.departmentService.getDepartments();
    }

    @Get(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getDepartmentsById(@Param("id") id: string) {
        return await this.departmentService.getDepartmentsById(id);
    }

    @Post()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async createDepartment(@Body() dto: CreateDepartmentDto) {
        return await this.departmentService.createDepartment(dto);
    }
    
    @Patch(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async updateDepartment(@Param("id") id: string, @Body() dto: UpdateDepartmentDto) {
        return await this.departmentService.updateDepartment(id, dto);
    }

    @Delete(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async deleteDepartment(@Param("id") id: string) {
        return await this.departmentService.deleteDepartment(id);
    }

}