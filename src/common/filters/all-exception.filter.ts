import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MESSAGES } from 'src/config/messages';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    let status: number;
    let message: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      let extractedMessage: string;

      if (typeof res === 'string') {
        extractedMessage = res;
      } else if (typeof res === 'object' && res !== null && 'message' in res) {
        const msg = (res as { message: unknown }).message;
        if (Array.isArray(msg)) {
          extractedMessage = msg.join(', '); // combine array of messages
        } else if (typeof msg === 'string') {
          extractedMessage = msg;
        } else {
          extractedMessage = MESSAGES.ERROR;
        }
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
      statusCode: status,
    });
  }
}
