import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      console.log('console log params', params); //pega todos os parametros

      const result = await next(params); // pega a response
      console.log('console log do result', result.updatedById);

      const { action, model } = params
      if (action === 'update' || action === 'create') {
        await this.auditLog.create({
          data: {
            model: model,
            method: actionToHttpMethod(action),
            objectId: result.id,
            userId: action === 'update' ?
              result.updatedById :
              result.createdById,
            timestamp: new Date()
          },
        })
      }
      return result;
    });
  }
}
// update user result.updatedById
// create user result.userCreatorId
// update a car result.updatedById
// create a car result.createdById

function actionToHttpMethod(action: string): string {
  switch (action.toLowerCase()) {
    case 'create':
      return 'POST';
    case 'update':
      return 'PATCH';
    default:
      throw new Error(`Unsupported action: ${action}`);
  }
}