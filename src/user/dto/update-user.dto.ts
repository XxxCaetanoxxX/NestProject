import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Perfil } from "@prisma/client";


export class UpdateUserDto extends PartialType(CreateUserDto) {
    name: string;
    senha: string;
    perfil: Perfil;
}
