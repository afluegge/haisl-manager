import { Module }         from "@nestjs/common";
import { GraphQLModule }  from "@nestjs/graphql";
import { JwtModule }      from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule }  from "@nestjs/typeorm";
import { AppController }  from "./app.controller";
import { AppService }     from "./app.service";
import { ConfigService }  from "./common/config.service";
import { Role }           from "./database/entities/role.entity";
import { User }           from "./database/entities/user.entity";
import { RoleService }    from "./database/role.service";
import { UserService }    from "./database/user.service";
import { RoleResolver }   from "./graphql/role.resolver";
import { DateScalar }     from "./graphql/scalars/date.scalar";
import { UserResolver }   from "./graphql/user.resolver";

@Module({
    imports:     [
        TypeOrmModule.forRoot({
            type:        "mysql",
            host:        "localhost",
            port:        3306,
            username:    "goiser",
            password:    "DgDtbWCLFGNHi8gqiqoY",
            database:    "goiser",
            entities:    [User, Role],
            synchronize: false
        }),
        TypeOrmModule.forFeature([User, Role]),
        GraphQLModule.forRoot({
            debug:                       false,
            playground:                  false,
            installSubscriptionHandlers: true,
            typePaths:                   ["./**/*.graphql"],
            context:                     ({ req }) => ({ req })
        }),
        PassportModule,
        JwtModule.registerAsync({
            imports: [AppModule],
            useFactory: (configuration: ConfigService) => ({
                secret: configuration.jwtSecret
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [AppController],
    providers:   [
        AppService, UserService, RoleService, DateScalar, UserResolver, RoleResolver,
        {
            provide: ConfigService,
            useValue: new ConfigService(`${process.env.NODE_ENV}.env`),
        }]
})
export class AppModule
{
}
