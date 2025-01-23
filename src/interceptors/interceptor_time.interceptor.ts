import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class InterceptorTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('antes');
    const req = context.switchToHttp().getRequest();
    console.log(`method:${req.method}, URL:${req.url}, body:${JSON.stringify(req.body, null, 2)} `);
    const inicio = Date.now();
    req['creationDate'] = new Date();

    return next.handle().pipe(
      tap(() => {
        console.log(`${Date.now() - inicio}ms`);
      })
    );
  }
}
