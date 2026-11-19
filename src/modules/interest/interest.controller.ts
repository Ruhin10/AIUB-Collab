import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import{InterestService} from "./interest.service";
import { CreateInterestDto, UpdateInterestDto } from "./dto/interest.dto";
import { JwtGuard } from "../../common/guard/jwt.guard";
import { RolesGuard } from "../../common/guard/roles.guard";
import { Roles } from "../../common/decorators/user-role.decorator";
import { UserRole } from "../../common/enums/user-role.enum";

@Controller("interests")
export class InterestController {

    constructor(private readonly interestService: InterestService) {}

    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getInterests() {
        return await this.interestService.getInterests();
    }

    @Get(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getInterestsById(@Param("id") id: string) {
        return await this.interestService.getInterestsById(id);
    }

    @Post()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async createInterest(@Body() dto: CreateInterestDto) {
        return await this.interestService.createInterest(dto);
    }
    
    @Patch(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async updateInterest(@Param("id") id: string, @Body() dto: UpdateInterestDto) {
        return await this.interestService.updateInterest(id, dto);
    }

    @Delete(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async deleteInterest(@Param("id") id: string) {
        return await this.interestService.deleteInterest(id);
    }

}