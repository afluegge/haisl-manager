import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { IncomingMessage }                                                  from "http";
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

        if (!this.isGraphQL(host))
        {
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
                path: request.url
            });
        }
    }

    private isGraphQL(host: ArgumentsHost): boolean
    {
        const ctx = host.getArgByIndex(2);

        return ctx && ctx.req instanceof IncomingMessage;


    }
}
