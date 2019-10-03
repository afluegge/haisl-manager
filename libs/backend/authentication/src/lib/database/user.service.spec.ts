import { IUser }                 from "@haisl-manager/api-interface";
import { SentryService }         from "@haisl-manager/backend/common";
import { Test, TestingModule }   from "@nestjs/testing";
import { getRepositoryToken }    from "@nestjs/typeorm";
import * as Sentry               from "@sentry/node";
import sentryTestkit, { Report } from "sentry-testkit";
import waitForExpect             from "wait-for-expect";
import { User }                  from "./entities/user.entity";
import { UserRepositoryMock }    from "./mocks/user.repository.mock";
import { UserService }           from "./user.service";

describe("UserService", () =>
{
    const { testkit, sentryTransport } = sentryTestkit();

    Sentry.init({
        dsn: "https://123@my-sentry.de/9876",
        transport: sentryTransport
        //... other configurations
    });

    let app: TestingModule;
    let userService: UserService;

    beforeAll(async () =>
    {
        app = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(User),
                    useValue: new UserRepositoryMock()
                },
                UserService, SentryService
            ]
        }).compile();

        userService = app.get<UserService>(UserService);
        testkit.reset();
    });

    beforeEach(() =>
    {
        testkit.reset();
    });


    it("should return all users", async (done) =>
    {
        const result: IUser[] = await userService.getAllUsers();

        expect(result).toHaveLength(7);

        done();
    });

    it("should skip users", async (done) =>
    {
        const skip = 3;
        const result: IUser[] = await userService.getAllUsers(skip);

        expect(result).toHaveLength(4);
        expect(result[0].id).toBe(4);

        done();
    });

    it("should take users", async (done) =>
    {
        const skip = 0;
        const take = 2;
        const result: IUser[] = await userService.getAllUsers(skip, take);

        expect(result).toHaveLength(2);
        expect(result[0].id).toBe(1);

        done();
    });

    it("should report to Sentry", async (done) =>
    {
        await userService.getAllUsers();

        await waitForExpect(() =>
        {
            const reports: Report[] = testkit.reports();
            expect(reports).toHaveLength(1);
            expect(reports[0].breadcrumbs).toHaveLength(2);

            const i = 0;
        });

        done();
    });
});
