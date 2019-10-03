import { IUser }                      from "@haisl-manager/api-interface";
import { UserService }                from "@haisl-manager/backend/authentication";
import { HaislObject, SentryService } from "@haisl-manager/backend/common";
import { Injectable }                 from "@nestjs/common";
import { JwtService }                 from "@nestjs/jwt";
import { compare }                    from "bcrypt";

export interface ILoginResult
{
    accessToken: string;
}

@Injectable()
export class AuthService extends HaislObject
{
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService, sentry: SentryService)
    {
        super(sentry);
    }

    public async validateUser(username: string, password: string): Promise<IUser | null>
    {
        this.logger.debug(`Validating User: ${username}, Password: ${password}`);

        const user: IUser = await this.userService.getUserByUsername(username);

        if (!user)
            return null;

        const pwdMatch: boolean = await compare(password, user.password);
        return pwdMatch ? user : null;
    }

    public async login(user: any): Promise<ILoginResult>
    {
        const payload = { username: user.username, sub: user.userId };
        return {
            accessToken: this.jwtService.sign(payload)
        };
    }
}
