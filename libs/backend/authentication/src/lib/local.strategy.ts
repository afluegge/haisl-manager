import { SentryCategory, SentryService }             from "@haisl-manager/backend/common";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy }                          from "@nestjs/passport";
import { Severity }                                  from "@sentry/types";
import { Strategy }                                  from "passport-local";
import { AuthService }                               from "./auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy)
{
    private readonly logger: Logger;

    constructor(private readonly authService: AuthService, private sentry: SentryService)
    {
        super();

        const className = this.constructor.name;
        const message = `Constructing ${className}`;

        this.logger = new Logger(className);

        sentry.addBreadcrumb(message, Severity.Debug, SentryCategory.Bootstrap);
    }

    public async validate(username: string, password: string): Promise<any>
    {
        this.logger.debug(`Validating User: ${username}, Password: ${password}`);

        const user = await this.authService.validateUser(username, password);

        if (!user)
            throw new UnauthorizedException();

        this.logger.debug(`User: ${JSON.stringify(user, null, 4)}`);

        return user;
    }
}
