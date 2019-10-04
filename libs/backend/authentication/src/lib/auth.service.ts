import { IUser }                      from "@haisl-manager/api-interface";
import { UserService }                from "@haisl-manager/backend/authentication";
import { HaislObject, SentryService } from "@haisl-manager/backend/common";
import { Injectable }                 from "@nestjs/common";
import { JwtService }                 from "@nestjs/jwt";
import { compare }                    from "bcrypt";
import { getUnixTime }                from "date-fns";

export interface IJwtPayload
{
    sub: string;
    iat: number;
    username: string
}

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

    public async login(user: IUser): Promise<ILoginResult>
    {
        const payload: IJwtPayload = {
            sub: user.id.toString(),
            iat: getUnixTime(new Date(Date.now())),
            username: user.username
        };

        return {
            accessToken: this.jwtService.sign(payload)
        };
    }
}
