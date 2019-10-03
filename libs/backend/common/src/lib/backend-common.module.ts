import { Module }        from "@nestjs/common";
import { ConfigService } from "./services/config.service";
import { SentryService } from "./services/sentry.service";

@Module({
    imports: [],
    exports: [ConfigService, SentryService],
    providers: [],
    controllers: []
})
export class BackendCommonModule
{
}
