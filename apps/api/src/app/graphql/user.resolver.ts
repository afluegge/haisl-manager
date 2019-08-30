import { Args, Query, Resolver } from "@nestjs/graphql";
import { User }                  from "../database/entities/user.entity";
import { UserService }           from "../database/user.service";

@Resolver(() => User)
export class UserResolver
{
    public constructor(private readonly userService: UserService)
    {
    }

    @Query("allUsers")
    public async allUsers(@Args("skip") skip?: number, @Args("take") take?: number): Promise<User[]>
    {
        // noinspection UnnecessaryLocalVariableJS  -  Left for debugging aid...
        const users: User[] = await this.userService.getAllUsers(skip, take);

        return users;
    }

    @Query("userByName")
    public async userByName(@Args("username") username: string): Promise<User>
    {
        // noinspection UnnecessaryLocalVariableJS  -  Left for debugging aid...
        const user: User = await this.userService.getUserByUsername(username);

        return user;
    }

    @Query("userByEmail")
    public async userByEmail(@Args("email") email: string): Promise<User>
    {
        // noinspection UnnecessaryLocalVariableJS  -  Left for debugging aid...
        const user: User = await this.userService.getUserByEmail(email);

        return user;
    }
}
