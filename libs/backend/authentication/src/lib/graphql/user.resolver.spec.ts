import { IUser }               from "@haisl-manager/api-interface";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken }  from "@nestjs/typeorm";
import { User }                from "../database/entities/user.entity";
import { UserRepositoryMock }  from "../database/mocks/user.repository.mock";
import { UserService }         from "../database/user.service";
import { UserResolver }        from "./user.resolver";

describe("UserResolver", () =>
{
    let app: TestingModule;
    let userResolver: UserResolver;

    beforeAll(async () =>
    {
        app = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(User),
                    useValue: new UserRepositoryMock()
                },
                UserService, UserResolver
            ]
        }).compile();

        userResolver = app.get<UserResolver>(UserResolver);
    });


    it("should  return all users", async (done) =>
    {
        const result: IUser[] = await userResolver.allUsers();

        expect(result.length).toBe(7);

        done();
    });
});
