import { async, TestBed } from "@angular/core/testing";
import { TestHelperModule } from "./test-helper.module";

describe("TestHelperModule", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestHelperModule]
        }).compileComponents();
    }));

    it("should create", () => {
        expect(TestHelperModule).toBeDefined();
    });
});
