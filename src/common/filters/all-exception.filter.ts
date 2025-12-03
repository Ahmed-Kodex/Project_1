import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MESSAGES } from 'src/config/messages';

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

      let extractedMessage: string;

      if (typeof res === 'string') {
        extractedMessage = res;
      } else if (
        typeof res === 'object' &&
        res !== null &&
        'message' in res &&
        typeof (res as { message: unknown }).message === 'string'
      ) {
        extractedMessage = (res as { message: string }).message;
      } else {
        extractedMessage = MESSAGES.ERROR;
      }
      message = extractedMessage;
    } else if (exception instanceof Error) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message || MESSAGES.ERROR;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = MESSAGES.ERROR;
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
