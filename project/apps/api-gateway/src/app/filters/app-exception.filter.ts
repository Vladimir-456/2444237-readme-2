import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { AxiosError } from 'axios';
import { Response } from 'express';

export class AppExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(AppExceptionFilter.name)

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest();

        let status = HttpStatus.INTERNAL_SERVER_ERROR
        let message: any = 'Internal server error';

        if (exception instanceof AxiosError) {
            status = exception.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
            message = exception.response?.data;
        }
        else if (exception instanceof HttpException) {
            status = exception.getStatus()
            message = exception.getResponse();
        }

        this.logger.error(`${request.method} ${request.url}`,
        exception instanceof Error ? exception.stack : String(exception),)

        response.status(status).json({
            statusCode: status,
            message,
            path: request.url,
            timestamp: new Date().toISOString(),
        })
    }
}