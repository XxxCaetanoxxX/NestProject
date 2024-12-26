import { IsNotEmpty, IsString, MinLength, Matches, IsEnum } from "class-validator";


export class SignInDto{
    @IsString({message: "nome deve ser string"})
    @MinLength(3, {message: "nome deve conter no minimo 3 caracteres"})
    @IsNotEmpty({message:"nome nao pode ser vazio"})
    name: string;

    @IsString({message: "senha deve ser string"})
    @MinLength(4, {message:"senha deve conter no minimo 4 caracteres"})
    @Matches(/.*\d.*/, { message: "senha deve conter pelo menos um número"}) //estudar essa linha
    @IsNotEmpty({message:"senha nao pode ser vazio"})
    senha: string
}