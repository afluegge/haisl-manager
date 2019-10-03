import {
    DateScalar,
    Role,
    RoleResolver,
    RoleService,
    User,
    UserResolver,
    UserService
}                                                                        from "@haisl-manager/backend/authentication";
import { ConfigService, GlobalErrorHandler, HaislObject, SentryService } from "@haisl-manager/backend/common";
import { Module }                                                        from "@nestjs/common";
import { APP_FILTER }                                                    from "@nestjs/core";
import { GraphQLModule }                                                 from "@nestjs/graphql";
import { TypeOrmModule }                                                 from "@nestjs/typeorm";
import { AppController }                                                 from "./app.controller";

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
        TypeOrmModule.forFeature([User, Role]),
        GraphQLModule.forRoot({
            debug: false,
            playground: false,
            installSubscriptionHandlers: true,
            typePaths: ["./**/*.graphql"],
            context: ({ req }) => ({ req })
        })
        // PassportModule,
        // JwtModule.registerAsync({
        //     imports: [AppModule],
        //     useFactory: (configuration: ConfigService) => ({
        //         secret: configuration.jwtSecret
        //     }),
        //     inject: [ConfigService]
        // })
    ],
    controllers: [AppController],
    providers: [
        UserService, RoleService, DateScalar, UserResolver, RoleResolver, SentryService,
        {
            provide: ConfigService,
            useValue: new ConfigService(`${process.env.NODE_ENV}.env`)
        },
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
