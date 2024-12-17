// roles.guard.ts
import {
    Injectable, CanActivate, ExecutionContext, UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // Obtém os perfis definidos na rota (metadados)
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true; // Se não houver perfis definidos, permite acesso
        }

        // Obtém o usuário autenticado
        const { user } = context.switchToHttp().getRequest();

        console.log({ requiredRoles, user });
        return requiredRoles.some((role) => user.perfil === role);
    }
}
