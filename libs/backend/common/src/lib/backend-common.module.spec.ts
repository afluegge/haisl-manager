import { async, TestBed }      from "@angular/core/testing";
import { BackendCommonModule } from "./backend-common.module";

describe("BackendCommonModule", () =>
{
    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            imports: [BackendCommonModule]
        }).compileComponents();
    }));

    it("should create", () =>
    {
        expect(BackendCommonModule).toBeDefined();
    });
});
