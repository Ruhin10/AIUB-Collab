import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { MailsModule } from "@/src/mails/mails.module";

@Module({
    imports: [
        PassportModule,
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.JWT_BEARER_SECRET!,
            signOptions: {
                expiresIn: "15m",
            },
        }),
        MailsModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}