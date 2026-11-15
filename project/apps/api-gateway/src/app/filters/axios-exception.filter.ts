import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { AxiosError } from "axios";
import { Response } from 'express'

const ITERNAL_ERROR_MESSAGE = 'Internal server error';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(exception: AxiosError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.response?.status ?? 500;

    response.status(status).json({
      statusCode: status,
      message: exception.response?.data ?? 'Internal server error',
    });
  }
}