import { Guid }                                          from "@haisl-manager/api-interface";
import { Logger }                                        from "@nestjs/common";
import * as Sentry                                       from "@sentry/node";
import { Severity }                                      from "@sentry/types";
import { BreadcrumbType, SentryCategory, SentryService } from "./services/sentry.service";

export abstract class HaislObject
{
    protected readonly logger: Logger;

    protected constructor(protected sentry?: SentryService)
    {
        const className = this.constructor.name;
        const message = `Constructing ${className}`;

        this.logger = new Logger(className);
        this.logger.debug(message);

        if (sentry)
            sentry.addBreadcrumb(message, Severity.Debug, SentryCategory.Bootstrap);
        else
            this.addBreadcrumbInternal(message, Severity.Debug, SentryCategory.Bootstrap);
    }

    private addBreadcrumbInternal(message: string, level: Sentry.Severity, category: SentryCategory, type: BreadcrumbType = BreadcrumbType.Default, data?: any): void
    {
        const eventId = Guid.newGuid().toString();
        const now = Date.now();
        const options: Sentry.Breadcrumb =
            {
                event_id: eventId,
                message: message,
                level: level,
                category: category.toString(),
                type: type,
                data: data,
                timestamp: now.valueOf()
            };

        Sentry.addBreadcrumb(options);

        this.logger.debug(`Sent a Breadcrumb to Sentry: "${message}"  [${eventId}]`);
    }
}
