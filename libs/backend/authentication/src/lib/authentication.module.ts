import { Module }       from "@nestjs/common";
import { RoleService }  from "./database/role.service";
import { UserService }  from "./database/user.service";
import { RoleResolver } from "./graphql/role.resolver";
import { DateScalar }   from "./graphql/scalars/date.scalar";
import { UserResolver } from "./graphql/user.resolver";

@Module({
    imports: [],
    exports: [UserService, RoleService, DateScalar, UserResolver, RoleResolver],
    providers: [UserService, RoleService, DateScalar, UserResolver, RoleResolver],
    controllers: []
})
export class AuthenticationModule
{
}
