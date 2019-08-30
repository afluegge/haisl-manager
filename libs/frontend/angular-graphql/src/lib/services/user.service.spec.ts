import { TestBed }                                                     from "@angular/core/testing";
import { IUser }                                                       from "@haisl-manager/api-interface";
import { ApolloTestingController, ApolloTestingModule, TestOperation } from "apollo-angular/testing";
import { GET_USERS_QUERY, UserService }                                from "./user.service";

describe("UserService", () =>
{
    let backend: ApolloTestingController;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            imports: [ApolloTestingModule]
        });

        backend = TestBed.get(ApolloTestingController);
    });

    it("should be created", () =>
    {
        const userService: UserService = TestBed.get(UserService);
        expect(userService).toBeTruthy();
    });

    it("should return a list of users", function(done)
    {
        const userService: UserService = TestBed.get(UserService);

        userService.getUsersAsync(2, 3)
                   .then((users: any) =>
                   {
                       expect(users.getAllUsers.length).toBe(3);
                       done();
                   });

        const op: TestOperation = backend.expectOne(GET_USERS_QUERY);

        expect(op.operation.variables.skip).toBe(2);
        expect(op.operation.variables.take).toBe(3);

        op.flush({
            "data": {
                "getAllUsers": [
                    {
                        "id":        "15",
                        "username":  "afluegge",
                        "firstName": "Andreas",
                        "lastName":  "Flügge",
                        "email":     "aflg1963@gmail.com",
                        "notes":     "Aaahh - der Chef. ;-)",
                        "locked":    false,
                        "roles":     [
                            {
                                "name":        "SiteAdmin",
                                "description": "A SiteAdmin has ALL rights in the system.  A SiteAdmin can create/read/update/delete clients, users and tenants."
                            }
                        ],
                        "modified":  "2019-06-30T15:39:08.000Z",
                        "created":   "2019-02-13T11:43:29.000Z"
                    },
                    {
                        "id":        "16",
                        "username":  "cfluegge",
                        "firstName": "Claudia",
                        "lastName":  "Flügge",
                        "email":     "cflg1966@gmail.com",
                        "notes":     "Und hier die Chefin.",
                        "locked":    false,
                        "roles":     [
                            {
                                "name":        "SiteEditor",
                                "description": "A SiteEditor can read & update all data in the system."
                            }
                        ],
                        "modified":  "2019-06-30T15:39:08.000Z",
                        "created":   "2019-02-13T11:43:29.000Z"
                    },
                    {
                        "id":        "17",
                        "username":  "hwinkle",
                        "firstName": "Heinz",
                        "lastName":  "Winkle",
                        "email":     "hwinkle@mail.com",
                        "notes":     null,
                        "locked":    true,
                        "roles":     [],
                        "modified":  "2019-02-13T11:43:29.000Z",
                        "created":   "2019-02-13T11:43:29.000Z"
                    }
                ]
            }
        });

        backend.verify();
    });

    it("should return a specific user", function()
    {
        const userService: UserService = TestBed.get(UserService);
        const user: IUser = userService.getUser("pbrause");

        expect(user).toBeDefined();
    });
});
