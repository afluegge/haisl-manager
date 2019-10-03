import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { HaislObject }                           from "./_haisl.object";
import { SentryService }                         from "./services/sentry.service";

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
    }
}
