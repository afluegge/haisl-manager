import { Role, User }                                     from "@haisl-manager/backend/authentication";
import { GlobalErrorHandler, HaislObject, SentryService } from "@haisl-manager/backend/common";
import { Module }                                         from "@nestjs/common";
import { APP_FILTER }                                     from "@nestjs/core";
import { TypeOrmModule }                                  from "@nestjs/typeorm";
import { AuthenticationModule }                           from "../../../../libs/backend/authentication/src/lib/authentication.module";
import { BackendCommonModule }                            from "../../../../libs/backend/common/src/lib/backend-common.module";
import { AppController }                                  from "./app.controller";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "goiser",
            password: "DgDtbWCLFGNHi8gqiqoY",
            database: "goiser",
            entities: [User, Role],
            synchronize: false
        }),
        AuthenticationModule,
        BackendCommonModule
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalErrorHandler
        }]
})
export class AppModule extends HaislObject
{
    constructor(sentry: SentryService)
    {
        super(sentry);
    }
}
