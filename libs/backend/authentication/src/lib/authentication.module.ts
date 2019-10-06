import { Role, User }          from "@haisl-manager/backend/authentication";
import { ConfigService }       from "@haisl-manager/backend/common";
import { Module }              from "@nestjs/common";
import { JwtModule }           from "@nestjs/jwt";
import { PassportModule }      from "@nestjs/passport";
import { TypeOrmModule }       from "@nestjs/typeorm";
import * as uuid               from "uuid";
import { BackendCommonModule } from "../../../common/src/lib/backend-common.module";
import { AuthService }         from "./auth.service";
import { RoleService }         from "./database/role.service";
import { UserService }         from "./database/user.service";
import { GqlAuthGuard }        from "./gql.auth-guard";
import { RoleResolver }        from "./graphql/role.resolver";
import { UserResolver }        from "./graphql/user.resolver";
import { JwtStrategy }         from "./jwt.strategy";
import { LocalStrategy }       from "./local.strategy";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role]),
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.registerAsync({
            imports: [BackendCommonModule],
            useFactory: (config: ConfigService) => ({
                secret: config.jwtSecret,
                signOptions: {
                    jwtid: uuid.v4(),
                    issuer: config.jwtIssuer,
                    expiresIn: "1d"
                }
            }),
            inject: [ConfigService]
        }),
        BackendCommonModule
    ],
    exports: [UserService, RoleService, UserResolver, RoleResolver, AuthService, GqlAuthGuard],
    providers: [UserService, RoleService, UserResolver, RoleResolver, AuthService, LocalStrategy, JwtStrategy, GqlAuthGuard],
    controllers: []
})
export class AuthenticationModule
{
}
