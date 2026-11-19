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

@Controller("users")
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get("me")
    @UseGuards(JwtGuard)
    async getCurrentUser(@Req() req: { user: { id: string } }) {
        return await this.userService.getCurrentUser(req.user.id);
    }

    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async getUsers() {
        return await this.userService.getUsers();
    }

    @Get(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async getUsersById(@Param("id") id: string) {
        return await this.userService.getUsersById(id);
    }

    @Post()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async createUser(@Body() dto: CreateUserDto) {
        return await this.userService.createUser(dto);
    }
    
    @Patch(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async updateUser(@Param("id") id: string, @Body() dto: UpdateUserDto) {
        return await this.userService.updateUser(id, dto);
    }

    @Delete(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async deleteUser(@Param("id") id: string) {
        return await this.userService.deleteUser(id);
    }

}