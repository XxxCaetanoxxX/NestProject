import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';

export class SignInDto extends PartialType(CreateAuthDto){
    name: string;
    senha: string
}