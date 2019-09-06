/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { NestFactory }   from "@nestjs/core";
import { AppModule }     from "./app/app.module";
import * as Sentry       from "@sentry/node";
import { SentryAdapter } from "./app/common/sentry-adapter";

async function bootstrap()
{
    const app = await NestFactory.create(AppModule);
    const globalPrefix = "api";

    Sentry.init({ dsn: "https://2cf32551161547b48a4c81ce8de29a27@sentry.io/1551886" });

    app.enableCors();
    app.enableShutdownHooks();
    app.setGlobalPrefix(globalPrefix);
    // app.useGlobalFilters(new SentryAdapter());

    const port = process.env.port || 3333;

    await app.listen(port, () =>
    {
        console.log("Listening at http://localhost:" + port + "/" + globalPrefix);
    });
}

bootstrap();
