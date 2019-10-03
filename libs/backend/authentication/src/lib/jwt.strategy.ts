import { ConfigService }        from "@haisl-manager/backend/common";
import { Injectable }           from "@nestjs/common";
import { PassportStrategy }     from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(private config: ConfigService)
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.jwtSecret
        });
    }

    public async validate(payload: any)
    {
        return { userId: payload.sub, username: payload.username };
    }
}
