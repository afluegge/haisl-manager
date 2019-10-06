import { IUser }                from "@haisl-manager/api-interface";
import { UserService }          from "@haisl-manager/backend/authentication";
import { ConfigService }        from "@haisl-manager/backend/common";
import { Injectable }           from "@nestjs/common";
import { PassportStrategy }     from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(private config: ConfigService, private userService: UserService)
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            issuer: config.jwtIssuer,
            ignoreExpiration: false,
            secretOrKey: config.jwtSecret
        });
    }

    public async validate(payload: any): Promise<IUser>
    {
        return this.userService.getUserById(payload.sub);
    }
}
