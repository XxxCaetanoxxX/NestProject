import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class CreationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    console.log(`method:${req.method}, URL:${req.url}, body:${JSON.stringify(req.body, null, 2)} `);
    req['creationDate'] = new Date();

    return next.handle()
  }
}
