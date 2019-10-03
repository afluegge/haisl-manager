import { Injectable } from "@angular/core";
import { Guid }       from "@haisl-manager/api-interface";
import { Logger }     from "@nestjs/common";
import * as Sentry    from "@sentry/node";
import { Severity }   from "@sentry/node";


export enum SentryCategory
{
    Bootstrap = "bootstrap",
    Repository = "repository",
    GraphQL = "graphql"
}

export enum BreadcrumbType
{
    Default = "default",
    Http = "http",
    Error = "error"
}


@Injectable({
    providedIn: "root"
})
export class SentryService
{
    // ToDo: Fix Circular Reference Problem when deriving from "HaislObject"
    // This is the only class not derived from "HaislObject" because of a circular reference problem
    private readonly logger: Logger;

    constructor()
    {
        const message = "Constructing SentryService";
        this.logger = new Logger(SentryService.name);
        this.logger.debug(message);
        this.addBreadcrumb(message, Severity.Debug, SentryCategory.Bootstrap);

        // ToDo: Add user info to Sentry scope:

        Sentry.configureScope((scope: Sentry.Scope) =>
        {
            // See: https://docs.sentry.io/enriching-error-data/context/?platform=node
            scope.setUser({
                id: "pbrause",
                username: "Paul Brause",
                email: "pbrause@mail.com"
            });
            scope.setTag("version", `${process.env.npm_package_version}`);
        });

    }

    public captureException(exception: unknown): void
    {
        const eventId: string = Sentry.captureException(exception);

        this.logger.debug(`Sent exception data to Sentry.  [${eventId}]`);
    }

    public addBreadcrumb(message: string, level: Sentry.Severity, category: SentryCategory, type: BreadcrumbType = BreadcrumbType.Default, data?: any): void
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

    public captureMessage(message: string, level: Sentry.Severity = Severity.Info): void
    {
        const eventId: string = Sentry.captureMessage(message, level);

        this.logger.debug(`Sending a message to Sentry.  [${eventId}]`);
    }

    public flush(): void
    {
        Sentry.flush();
    }
}
