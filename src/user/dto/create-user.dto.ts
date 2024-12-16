import { PartialType } from "@nestjs/mapped-types";
import { Perfil } from "@prisma/client";

export class CreateUserDto{
    name: string;
    senha: string;
    perfil: Perfil;
  }