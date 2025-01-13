import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './prisma/all-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()//libera para receber requisição de todas as urls e metodos

  app.useGlobalPipes(new ValidationPipe({ //validação
    whitelist: true //ignora keys json que nao estiverem na dto
  }));
  //const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter());

  const configSwagger = new DocumentBuilder()
  .setTitle('Api estacionamento')
  .setDescription('Api para gerenciamento de estacionamento, treinamento com nest')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const documentFactoty = () => SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup('/',app, documentFactoty);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
