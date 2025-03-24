const Key = require("../../domain/Key.js"),
    Topic = require("../../domain/Topic.js");

function handleError (error) {
    console.error(error);
}

describe("Key tests", () => {

    test("Validate invalid key", async () => {
        let response = Key.INVALID_KEY;
        expect(response).toBe("INVALID");
    });

    test("Validate oil level low", async () => {
        let response = Key.OIL_LEVEL_LOW;
        expect(response).toBe("oilLevelLow");
    });

    test("Validate rsvr oil temp", async () => {
        let response = Key.RSVR_OIL_TEMP;
        expect(response).toBe("rsvrOilTemp");
    });

    test("Validate tank oil temp", async () => {
        let response = Key.TANK_OIL_TEMP;
        expect(response).toBe("tankOilTemp");
    });

    test("Validate pdu power state", async () => {
        let response = Key.PDU_POWER_STATE;
        expect(response).toBe("pduPowerState");
    });

    test("Validate getTopic", async () => {
        expect(Key.getTopic("asdf")).toBe(Key.INVALID_KEY);
        expect(Key.getTopic(Key.OIL_LEVEL_LOW)).toBe(Topic.OIL_LEVEL_LOW);
        expect(Key.getTopic(Key.RSVR_OIL_TEMP)).toBe(Topic.RSVR_OIL_TEMP);
        expect(Key.getTopic(Key.TANK_OIL_TEMP)).toBe(Topic.TANK_OIL_TEMP);
        expect(Key.getTopic(Key.PDU_POWER_STATE)).toBe(Topic.PDU_POWER_STATE);
    });

});
