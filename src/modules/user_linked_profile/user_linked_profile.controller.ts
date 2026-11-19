import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,UseGuards
} from "@nestjs/common";
import {
  CreateUserLinkedProfileDto,
  UpdateUserLinkedProfileDto,
} from "./dto/user_linked_profile.dto";
import { UserLinkedProfileService } from "./user_linked_profile.service";
import {JwtGuard} from "@/common/guard/jwt.guard";
import {RolesGuard} from "@/common/guard/roles.guard";
import {Roles} from "@/common/decorators/user-role.decorator";
import {UserRole} from "@/common/enums/user-role.enum";
@Controller("user-linked-profiles")
export class UserLinkedProfileController {
  constructor(
    private readonly userLinkedProfileService: UserLinkedProfileService,
  ) {}

  @Get()
   @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
  async getUserLinkedProfiles() {
    return await this.userLinkedProfileService.getUserLinkedProfiles();
  }

  @Get(":id")
   @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
  async getUserLinkedProfileById(@Param("id") id: string) {
    return await this.userLinkedProfileService.getUserLinkedProfileById(id);
  }

  @Post()
   @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
  async createUserLinkedProfile(
    @Body() dto: CreateUserLinkedProfileDto,
  ) {
    return await this.userLinkedProfileService.createUserLinkedProfile(dto);
  }

  @Patch(":id")
   @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
  async updateUserLinkedProfile(
    @Param("id") id: string,
    @Body() dto: UpdateUserLinkedProfileDto,
  ) {
    return await this.userLinkedProfileService.updateUserLinkedProfile(
      id,
      dto,
    );
  }

  @Delete(":id")
   @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER, UserRole.ADMIN)
  async deleteUserLinkedProfile(@Param("id") id: string) {
    return await this.userLinkedProfileService.deleteUserLinkedProfile(id);
  }
}