import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from "@nestjs/common";
import { ComplaintReportService } from "./complaint_report.service";
import {CreateComplaintReportDto, UpdateComplaintReportDto} from "./dto/complaint_report.dto";
import {JwtGuard} from "@/common/guard/jwt.guard";
import {RolesGuard} from "@/common/guard/roles.guard";
import {Roles} from "@/common/decorators/user-role.decorator";
import {UserRole} from "@/common/enums/user-role.enum";
import {ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";

@ApiTags("Complaint Reports")
@ApiBearerAuth()
@Controller("complaint-reports")
export class ComplaintReportController {
    constructor(
        private readonly complaintReportService: ComplaintReportService,
    ) {}
    // Get
    @Get()
    @ApiOperation({
        summary: "Get all complaint reports",
        description: "Returns complaint reports with their related users and post.",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "User role is not permitted",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async getComplaintReports() {
        return await this.complaintReportService.getComplaintReports();
    }
    // Get by id
    @Get(":id")
    @ApiOperation({
        summary: "Get a complaint report by ID",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the complaint report",
        example: "550e8400-e29b-41d4-a716-446655440004",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "User role is not permitted",
    })
    @ApiNotFoundResponse({
        description: "Complaint report not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async getComplaintReportById(@Param("id") id: string) {
        return await this.complaintReportService.getComplaintReportById(id);
    }
    // Post
    @Post()
    @ApiOperation({
        summary: "Create a complaint report",
    })
    @ApiBadRequestResponse({
        description: "Invalid complaint report data",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only User role is permitted",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
    async createComplaintReport(@Body() dto: CreateComplaintReportDto) {
        return await this.complaintReportService.createComplaintReport(dto);
    }
    // Patch
    @Patch(":id")
    @ApiOperation({
        summary: "Update a complaint report",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the complaint report",
        example: "550e8400-e29b-41d4-a716-446655440004",
    })
    @ApiBadRequestResponse({
        description: "Invalid complaint report update data",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "User role is not permitted",
    })
    @ApiNotFoundResponse({
        description: "Complaint report not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async updateComplaintReport(@Param("id") id: string, @Body() dto: UpdateComplaintReportDto) {
        return await this.complaintReportService.updateComplaintReport(id, dto);
    }
    // Delete
    @Delete(":id")
    @ApiOperation({
        summary: "Delete a complaint report",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the complaint report",
        example: "550e8400-e29b-41d4-a716-446655440004",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "User role is not permitted",
    })
    @ApiNotFoundResponse({
        description: "Complaint report not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async deleteComplaintReport(@Param("id") id: string) {
        return await this.complaintReportService.deleteComplaintReport(id);
    }
}