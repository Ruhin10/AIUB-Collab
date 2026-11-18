import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  CreateCollabPostPreferredDepartmentDto,
  UpdateCollabPostPreferredDepartmentDto,
} from "./dto/collab_post_preferred_department.dto";
import { CollabPostPreferredDepartmentService } from "./collab_post_preferred_department.service";
import { UserRole } from "@/src/common/enums/user-role.enum";
import { Roles } from "@/src/common/decorators/user-role.decorator";
import { RolesGuard } from "@/src/common/guard/roles.guard";
import { JwtGuard } from "@/src/common/guard/jwt.guard";
import {UseGuards} from "@nestjs/common";

@Controller("collab-post-preferred-departments")
export class CollabPostPreferredDepartmentController {
  constructor(
    private readonly preferredDepartmentService: CollabPostPreferredDepartmentService,
  ) {}

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  getCollabPostPreferredDepartments() {
    return this.preferredDepartmentService.getCollabPostPreferredDepartments();
  }

  @Get(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  getCollabPostPreferredDepartmentById(@Param("id") id: string) {
    return this.preferredDepartmentService.getCollabPostPreferredDepartmentById(
      id,
    );
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  createCollabPostPreferredDepartment(
    @Body() dto: CreateCollabPostPreferredDepartmentDto,
  ) {
    return this.preferredDepartmentService.createCollabPostPreferredDepartment(
      dto,
    );
  }

  @Patch(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  updateCollabPostPreferredDepartment(
    @Param("id") id: string,
    @Body() dto: UpdateCollabPostPreferredDepartmentDto,
  ) {
    return this.preferredDepartmentService.updateCollabPostPreferredDepartment(
      id,
      dto,
    );
  }

  @Delete(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  deleteCollabPostPreferredDepartment(@Param("id") id: string) {
    return this.preferredDepartmentService.deleteCollabPostPreferredDepartment(
      id,
    );
  }
}