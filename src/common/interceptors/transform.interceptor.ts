import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // if data has both message and data, separate them
        if (data && data.message && data.data) {
          return instanceToPlain({
            status: 'success',
            message: data.message,
            data: data.data,
          });
        }
        // if data has message but no data, put message at top level
        if (data && data.message && !data.data) {
          const { message, ...rest } = data;
          return instanceToPlain({
            status: 'success',
            message,
            data: rest,
          });
        }
        // default: everything goes under data
        return instanceToPlain({
          status: 'success',
          data,
        });
      }),
    );
  }
}
