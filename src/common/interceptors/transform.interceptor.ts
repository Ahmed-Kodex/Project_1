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
  status?: string;
  message?: string;
  data?: unknown;
  pagination?: unknown;
  [key: string]: unknown;
}
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((rawData: TransformResponse) => {
        if (
          rawData &&
          rawData.status &&
          (rawData.data !== undefined || rawData.pagination !== undefined)
        ) {
          return instanceToPlain(rawData);
        }
        if (rawData?.message && rawData?.data !== undefined) {
          return instanceToPlain({
            status: 'success',
            message: rawData.message,
            data: rawData.data,
          });
        }
        if (rawData?.message && rawData?.data === undefined) {
          const { message, ...rest } = rawData;
          return instanceToPlain({
            status: 'success',
            message,
            data: rest,
          });
        }
        return instanceToPlain({
          status: 'success',
          data: rawData,
        });
      }),
    );
  }
}
