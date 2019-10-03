import { HaislObject, SentryCategory, SentryService }          from "@haisl-manager/backend/common";
import { Controller, OnApplicationBootstrap, OnModuleDestroy } from "@nestjs/common";
import { Severity }                                            from "@sentry/types";


@Controller()
export class AppController extends HaislObject implements OnApplicationBootstrap, OnModuleDestroy
{
    constructor(sentry: SentryService)
    {
        super(sentry);
    }

    onApplicationBootstrap(): any
    {
        const message = "Bootstrapping HaislManager";
        this.logger.log(`${message}...`);
        this.sentry.addBreadcrumb(message, Severity.Info, SentryCategory.Bootstrap);
    }

    onModuleDestroy(): any
    {
        const message = "Shutdown HaislManager";
        this.logger.log(`${message}...`);
        this.sentry.addBreadcrumb(message, Severity.Info, SentryCategory.Bootstrap);
    }
}
