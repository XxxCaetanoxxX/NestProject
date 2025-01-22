import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      // console.log('console log params', params); //pega todos os parametros

      // const result = await next(params); // pega a response
      // console.log('console log do result', result)

      // const { action, model } = params
      // console.log('console log endpoint', action, model)
      // if (action === 'findFirst' && model === 'User') {
      //   console.log('console log endpoint de login')
      //   await this.userAudit.create({
      //     data: {
      //       version: 1,
      //       responsibleId: result.id //id da pessoa logada
      //     }
      //   })
      //   console.log('created')
      // }

      return next(params);
    });
  }
}
