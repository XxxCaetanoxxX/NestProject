import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCarroDto {
    @IsString({message: "o nome precisa ser um texto"})
    @MinLength(2, {message: "o nome precisa ter mais do que dois caracteres"})
    @IsNotEmpty({message:"nome nao pode ser vazio"})
    nome: string;

    @IsString({message: "deve ser uma user id string"})
    @MinLength(15, {message: "o id deve ter no minimo 15 caracteres"})
    @IsNotEmpty({message:"id nao pode ser vazio"})
    userId: string;
}