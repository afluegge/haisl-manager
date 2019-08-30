import { async, TestBed }       from "@angular/core/testing";
import { AngularGraphqlModule } from "./angular-graphql.module";

describe("AngularGraphqlModule", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AngularGraphqlModule]
        }).compileComponents();
    }));

    it("should create", () => {
        expect(AngularGraphqlModule).toBeDefined();
    });
});
