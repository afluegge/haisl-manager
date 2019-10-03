/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { GlobalErrorHandler, HaislLogger, SentryService } from "@haisl-manager/backend/common";
import { NestFactory }                                    from "@nestjs/core";
import * as Sentry                                        from "@sentry/node";
import { AppModule }                                      from "./app/app.module";

Sentry.init(
    {
        dsn: "https://2cf32551161547b48a4c81ce8de29a27@sentry.io/1551886",
        release: process.env.npm_package_sentry_revision,
        attachStacktrace: true
    });

async function bootstrap()
{
    const app = await NestFactory.create(AppModule, { logger: new HaislLogger(undefined, true) });
    const globalPrefix = "api";

    app.enableCors();
    app.enableShutdownHooks();
    app.setGlobalPrefix(globalPrefix);

    const sentry = app.get(SentryService);

    app.useGlobalFilters(new GlobalErrorHandler(sentry));

    const port = process.env.port || 3333;

    await app.listen(port, () =>
    {
        console.log("Listening at http://localhost:" + port + "/" + globalPrefix);
    });
}

bootstrap();
