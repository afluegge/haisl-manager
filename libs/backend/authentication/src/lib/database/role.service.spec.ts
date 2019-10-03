import { IRole }               from "@haisl-manager/api-interface";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken }  from "@nestjs/typeorm";
import { Role }                from "./entities/role.entity";
import { RoleRepositoryMock }  from "./mocks/role.repository.mock";
import { RoleService }         from "./role.service";

describe("RoleService", () =>
{
    let app: TestingModule;
    let roleService: RoleService;

    beforeAll(async () =>
    {
        app = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(Role),
                    useValue: new RoleRepositoryMock()
                },
                RoleService
            ]
        }).compile();

        roleService = app.get<RoleService>(RoleService);
    });


    it("should return all roles", async (done) =>
    {
        const result: IRole[] = await roleService.getAllRoles();

        expect(result.length).toBe(8);

        done();
    });

    it("should skip roles", async (done) =>
    {
        const skip = 3;
        const result: IRole[] = await roleService.getAllRoles(skip);

        expect(result.length).toBe(5);
        expect(result[0].id).toBe(4);

        done();
    });

    it("should take roles", async (done) =>
    {
        const skip = 0;
        const take = 2;
        const result: IRole[] = await roleService.getAllRoles(skip, take);

        expect(result.length).toBe(2);
        expect(result[0].id).toBe(1);

        done();
    });
});
