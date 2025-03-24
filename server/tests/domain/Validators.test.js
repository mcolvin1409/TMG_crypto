const Validators = require("../../domain/Validators.js");

describe("Validators tests", () => {

    test("Validate valid url", async () => {
        let success = Validators.isValidUrl("tmgcore.com");
        expect(success).toBe(true);
    });
});
