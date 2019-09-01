import { IUser }               from "@haisl-manager/api-interface";
import { TestingModule, Test } from "@nestjs/testing";
import { getRepositoryToken }  from "@nestjs/typeorm";
import { UserRepositoryMock }  from "../../../../../libs/test-helper/src/lib/user.repository.mock";
import { User }                from "./entities/user.entity";
import { UserService }         from "./user.service";

describe("UserService", () =>
{
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
                UserService
            ]
        }).compile();

        userService = app.get<UserService>(UserService);
    });


    it("should return all users", async (done) =>
    {
        const result: IUser[] = await userService.getAllUsers();

        expect(result.length).toBe(7);

        done();
    });

    it("should skip users", async (done) =>
    {
        const skip = 3;
        const result: IUser[] = await userService.getAllUsers(skip);

        expect(result.length).toBe(4);
        expect(result[0].id).toBe(4);

        done();
    });

    it("should take users", async (done) =>
    {
        const skip = 0;
        const take = 2;
        const result: IUser[] = await userService.getAllUsers(skip, take);

        expect(result.length).toBe(2);
        expect(result[0].id).toBe(1);

        done();
    });
});
