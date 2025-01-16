import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal Server Error';

    // Verificar se é uma exceção HttpException
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseMessage = exception.getResponse();

      // Garante que `message` seja tratado como string ou objeto
      if (typeof responseMessage === 'string') {
        message = { message: responseMessage };
      } else if (typeof responseMessage === 'object') {
        message = responseMessage;
      }
    }

    // Verificar se é um erro conhecido do Prisma
    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      message = this.mapPrismaError(exception);
    }
    // Verificar se é um erro desconhecido do Prisma
    else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = { message: 'UNKNOW PRISMA ERROR' };
    }
    // Caso seja outro tipo de erro
    else {
      message = { message: exception.message || message };
    }

    response.status(status).json({
      ...message,
    });
  }

  // Mapeia os erros conhecidos do Prisma para mensagens legíveis
  private mapPrismaError(exception: Prisma.PrismaClientKnownRequestError): any {
    switch (exception.code) {
      case 'P2002':
        return { message: 'Already existing.' };
      case 'P2003':
        return { message: 'No registration' };
      case 'P2025':
        return { message: 'Not Found' };
      default:
        return { message: 'A database error occurred.' };
    }
  }
}
