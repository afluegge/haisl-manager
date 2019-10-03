import { HaislObject, SentryCategory, SentryService }                                         from "@haisl-manager/backend/common";
import { Controller, Get, OnApplicationBootstrap, OnModuleDestroy, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard }                                                                          from "@nestjs/passport";
import { Severity }                                                                           from "@sentry/types";
import {
    AuthService,
    ILoginResult
}                                                                                             from "../../../../libs/backend/authentication/src/lib/auth.service";


@Controller()
export class AppController extends HaislObject implements OnApplicationBootstrap, OnModuleDestroy
{
    constructor(private readonly authService: AuthService, sentry: SentryService)
    {
        super(sentry);
    }


    @UseGuards(AuthGuard("local"))
    @Post("login")
    public async login(@Request() req): Promise<ILoginResult>
    {
        this.logger.debug("Do Login...");
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("me")
    getProfile(@Request() req)
    {
        return req.user;
    }

    onApplicationBootstrap(): any
    {
        const message = "Bootstrapping HaislManager";
        this.logger.log(`${message}...`);
        this.sentry.addBreadcrumb(message, Severity.Info, SentryCategory.Bootstrap);
    }

    onModuleDestroy(): any
    {
        const message = "Shutdown HaislManager";
        this.logger.log(`${message}...`);
        this.sentry.addBreadcrumb(message, Severity.Info, SentryCategory.Bootstrap);
    }
}
