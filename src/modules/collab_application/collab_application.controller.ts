import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CollabApplicationService } from "./collab_application.service";
import {
  CreateCollabApplicationDto,
  UpdateCollabApplicationDto,
} from "./dto/collab_application.dto";
import { JwtGuard } from "@/common/guard/jwt.guard";
import { RolesGuard } from "@/common/guard/roles.guard";
import { Roles } from "@/common/decorators/user-role.decorator";
import { UserRole } from "@/common/enums/user-role.enum";

@Controller("collab-applications")
export class CollabApplicationController {
  constructor(
    private readonly collabApplicationService: CollabApplicationService,
  ) {}

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  async getCollabApplications() {
    return this.collabApplicationService.getCollabApplications();
  }

  @Get(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  async getCollabApplicationById(@Param("id") id: string) {
    return this.collabApplicationService.getCollabApplicationById(id);
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  async createCollabApplication(@Body() dto: CreateCollabApplicationDto) {
    return this.collabApplicationService.createCollabApplication(dto);
  }

  @Patch(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  async updateCollabApplication(
    @Param("id") id: string,
    @Body() dto: UpdateCollabApplicationDto,
  ) {
    return this.collabApplicationService.updateCollabApplication(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  async deleteCollabApplication(@Param("id") id: string) {
    return this.collabApplicationService.deleteCollabApplication(id);
  }
}
