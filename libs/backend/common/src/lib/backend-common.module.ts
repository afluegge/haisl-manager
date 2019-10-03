import { Module }        from "@nestjs/common";
import { ConfigService } from "./services/config.service";
import { SentryService } from "./services/sentry.service";

@Module({
    imports: [],
    exports: [ConfigService, SentryService],
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService(`${process.env.NODE_ENV}.env`)
        },
        SentryService
    ],
    controllers: []
})
export class BackendCommonModule
{
}
