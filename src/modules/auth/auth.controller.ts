import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
} from "@nestjs/common";
import { LoginDto, RegisterDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    @ApiOperation({
        summary: "Register a user",
        description: "Creates a user account and returns an access token.",
    })
    @ApiBadRequestResponse({
        description: "Invalid registration data",
    })
    @ApiConflictResponse({
        description: "An account with this email already exists",
    })
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post("login")
    @ApiOperation({
        summary: "Login",
        description: "Validates credentials and returns a JWT access token.",
    })
    @ApiBadRequestResponse({
        description: "Invalid login data",
    })
    @ApiUnauthorizedResponse({
        description: "Invalid email or password, or inactive account",
    })
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}