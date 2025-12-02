import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status: number;
        let message: string | string[];

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            message =
                typeof res === 'string'
                    ? res
                    : (res as any).message || 'Something went wrong';
        } else if (exception instanceof Error) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = exception.message || 'Something went wrong';
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Something went wrong';
        }

        response.status(status).json({
            status: 'error',
            message,
            error: {
                timestamp: new Date().toISOString(),
                path: request.url,
                statusCode: status,
            },
        });
    }
}
