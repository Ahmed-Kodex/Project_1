import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { instanceToPlain } from 'class-transformer';

interface TransformResponse {
  message?: string;
  data?: unknown;
  [key: string]: unknown;
}
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((rawData) => {
        const data = rawData as TransformResponse;

        if (data.message && data.data !== undefined) {
          return instanceToPlain({
            status: 'success',
            message: data.message,
            data: data.data,
          });
        }

        if (data.message && data.data === undefined) {
          const { message, ...rest } = data;
          return instanceToPlain({
            status: 'success',
            message,
            data: rest,
          });
        }

        return instanceToPlain({
          status: 'success',
          data,
        });
      }),
    );
  }
}
