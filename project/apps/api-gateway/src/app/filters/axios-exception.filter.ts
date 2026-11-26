import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { AxiosError } from "axios";
import { Response } from 'express'

const ITERNAL_ERROR_MESSAGE = 'Internal server error';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(exception: AxiosError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.response?.status ?? 500;
    const data = exception.response?.data as | {
          message?: string | string[];
          error?: string;
          statusCode?: number;
        }
      | undefined;
    
    const message = Array.isArray(data?.message) ? data.message.join(', ')
      : data?.message ?? exception.message;   
    response.status(status).json({
      statusCode: status,
      message: message,
      error: data?.error ?? ITERNAL_ERROR_MESSAGE
    });
  }
}