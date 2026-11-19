import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from "@nestjs/common";
import { AdminLevel } from "../enums/admin-level.enum";
import { UserRole } from "../enums/user-role.enum";

@Injectable()
export class SuperAdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (
            user?.roles?.includes(UserRole.ADMIN)
            && user.admin_level === AdminLevel.SUPER_ADMIN
        ) {
            return true;
        }

        throw new ForbiddenException(
            "Only Super Admin users can delete users",
        );
    }
}
