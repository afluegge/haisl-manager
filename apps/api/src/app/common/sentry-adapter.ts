import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import * as Sentry                               from "@sentry/node";

@Catch()
export class SentryAdapter implements ExceptionFilter
{
    public catch(exception: unknown, host: ArgumentsHost): void
    {
        Sentry.captureException(exception);
    }
}
