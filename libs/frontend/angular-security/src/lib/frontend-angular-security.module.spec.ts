import { async, TestBed } from "@angular/core/testing";
import { FrontendAngularSecurityModule } from "./frontend-angular-security.module";

describe("FrontendAngularSecurityModule", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FrontendAngularSecurityModule]
        }).compileComponents();
    }));

    it("should create", () => {
        expect(FrontendAngularSecurityModule).toBeDefined();
    });
});
