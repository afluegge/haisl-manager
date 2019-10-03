import { HaislError }                                 from "@haisl-manager/api-interface";
import { HaislObject, SentryCategory, SentryService } from "@haisl-manager/backend/common";
import { Args, Query, Resolver }                      from "@nestjs/graphql";
import { Severity }                                   from "@sentry/types";
import { User }                                       from "../database/entities/user.entity";
import { UserService }                                from "../database/user.service";

@Resolver(() => User)
export class UserResolver extends HaislObject
{
    public constructor(private readonly userService: UserService, sentry: SentryService)
    {
        super(sentry);
    }

    @Query("allUsers")
    public async allUsers(@Args("skip") skip?: number, @Args("take") take?: number): Promise<User[]>
    {
        this.sentry.addBreadcrumb("GraphQL: Getting all Users", Severity.Debug, SentryCategory.GraphQL);

        if (skip && skip < 0)
        {
            const ex = new HaislError(`Invalid skip value: ${skip}`);
            this.logger.error(ex);
            this.sentry.captureException(ex);
            throw ex;
        }

        if (take && take < 0)
        {
            const ex = new HaislError(`Invalid take value: ${take}`);
            this.logger.error(ex);
            this.sentry.captureException(ex);
            throw ex;
        }

        // noinspection UnnecessaryLocalVariableJS  -  Left for debugging aid...
        const users: User[] = await this.userService.getAllUsers(skip, take);

        return users;
    }

    @Query("userByName")
    public async userByName(@Args("username") username: string): Promise<User>
    {
        this.sentry.addBreadcrumb("Getting user by name", Severity.Debug, SentryCategory.GraphQL);

        // noinspection UnnecessaryLocalVariableJS  -  Left for debugging aid...
        const user: User = await this.userService.getUserByUsername(username);

        return user;
    }

    @Query("userByEmail")
    public async userByEmail(@Args("email") email: string): Promise<User>
    {
        this.sentry.addBreadcrumb("Getting user by eMail", Severity.Debug, SentryCategory.GraphQL);

        // noinspection UnnecessaryLocalVariableJS  -  Left for debugging aid...
        const user: User = await this.userService.getUserByEmail(email);

        return user;
    }
}
