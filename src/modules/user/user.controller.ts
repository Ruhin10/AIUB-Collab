import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";
import { JwtGuard } from "../../common/guard/jwt.guard";
import { RolesGuard } from "../../common/guard/roles.guard";
import { Roles } from "../../common/decorators/user-role.decorator";
import { UserRole } from "../../common/enums/user-role.enum";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
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

@ApiTags("Users")
@ApiBearerAuth()
@Controller("users")
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get("me")
    @ApiOperation({
        summary: "Get the current user",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiNotFoundResponse({
        description: "User not found",
    })
    @UseGuards(JwtGuard)
    async getCurrentUser(@Req() req: { user: { id: string } }) {
        return await this.userService.getCurrentUser(req.user.id);
    }

    @Get()
    @ApiOperation({
        summary: "Get all users",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin role is permitted",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async getUsers() {
        return await this.userService.getUsers();
    }

    @Get(":id")
    @ApiOperation({
        summary: "Get a user by ID",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the user",
        example: "550e8400-e29b-41d4-a716-446655440001",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin role is permitted",
    })
    @ApiNotFoundResponse({
        description: "User not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async getUsersById(@Param("id") id: string) {
        return await this.userService.getUsersById(id);
    }

    @Post()
    @ApiOperation({
        summary: "Create a user",
    })
    @ApiBadRequestResponse({
        description: "Invalid user data",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin role is permitted",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async createUser(@Body() dto: CreateUserDto) {
        return await this.userService.createUser(dto);
    }
    
    @Patch(":id")
    @ApiOperation({
        summary: "Update a user",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the user",
        example: "550e8400-e29b-41d4-a716-446655440001",
    })
    @ApiBadRequestResponse({
        description: "Invalid user update data",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin role is permitted",
    })
    @ApiNotFoundResponse({
        description: "User not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async updateUser(@Param("id") id: string, @Body() dto: UpdateUserDto) {
        return await this.userService.updateUser(id, dto);
    }

    @Delete(":id")
    @ApiOperation({
        summary: "Delete a user",
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "UUID of the user",
        example: "550e8400-e29b-41d4-a716-446655440001",
    })
    @ApiUnauthorizedResponse({
        description: "Missing or invalid bearer token",
    })
    @ApiForbiddenResponse({
        description: "Only Admin role is permitted",
    })
    @ApiNotFoundResponse({
        description: "User not found",
    })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async deleteUser(@Param("id") id: string) {
        return await this.userService.deleteUser(id);
    }

}