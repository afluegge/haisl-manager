import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HaislObject }                                                      from "./_haisl.object";
import { SentryService }                                                    from "./services/sentry.service";

@Catch()
export class GlobalErrorHandler extends HaislObject implements ExceptionFilter
{
    constructor(sentry: SentryService)
    {
        super(sentry);
    }

    public catch(exception: unknown, host: ArgumentsHost): void
    {
        this.sentry.captureException(exception);
        this.logger.error(JSON.stringify(exception, null, 4));

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
