import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post, UseGuards
} from "@nestjs/common";
import {
  CreateCollabPostPreferredAcademicIdentityDto,
  UpdateCollabPostPreferredAcademicIdentityDto,
} from "./dto/collab_post_preferred_academic_identity.dto";
import { CollabPostPreferredAcademicIdentityService } from "./collab_post_preferred_academic_identity.service";
import {JwtGuard} from "@/common/guard/jwt.guard";
import {RolesGuard} from "@/common/guard/roles.guard";
import {Roles} from "@/common/decorators/user-role.decorator";
import {UserRole} from "@/common/enums/user-role.enum";
@Controller("collab-post-preferred-academic-identities")
export class CollabPostPreferredAcademicIdentityController {
  constructor(
    private readonly collabPostPreferredAcademicIdentityService: CollabPostPreferredAcademicIdentityService,
  ) {}

  @Get()
   @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
  async getAll() {
    return await this.collabPostPreferredAcademicIdentityService.getAll();
  }

  @Get(":id")
   @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
  async getById(@Param("id", ParseUUIDPipe) id: string) {
    return await this.collabPostPreferredAcademicIdentityService.getById(id);
  }

  @Post()
   @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
  async create(
    @Body() dto: CreateCollabPostPreferredAcademicIdentityDto,
  ) {
    return await this.collabPostPreferredAcademicIdentityService.create(dto);
  }

  @Patch(":id")
   @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateCollabPostPreferredAcademicIdentityDto,
  ) {
    return await this.collabPostPreferredAcademicIdentityService.update(
      id,
      dto,
    );
  }

  @Delete(":id")
   @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.USER)
  async delete(@Param("id", ParseUUIDPipe) id: string) {
    return await this.collabPostPreferredAcademicIdentityService.delete(id);
  }
}