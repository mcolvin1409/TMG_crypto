const Thresholds = require("../../domain/Thresholds.js");

function handleError (error) {
    console.error(error);
}

describe("Thresholds tests", () => {

    test("range", async () => {
        let range = Thresholds.range;
        let props = ["RSVR_OIL_TEMP_MIN", "RSVR_OIL_TEMP_MAX", "TANK_OIL_TEMP_MIN", "TANK_OIL_TEMP_MAX"];
        for (let i=0; i<props.length; i++) {
            expect(range).toHaveProperty(props[i]);
        }
    });

    test("range", async () => {
        let defaults = Thresholds.default;
        expect(defaults).toHaveProperty('rsvrOilTempMajorThreshold', 60);
        expect(defaults).toHaveProperty('rsvrOilTempCriticalThreshold', 75);
        expect(defaults).toHaveProperty('tankOilTempMajorThreshold', 45);
        expect(defaults).toHaveProperty('tankOilTempCriticalThreshold', 55);
    });

    test("info path", async () => {
        expect(Thresholds.INFO_PATH).toBe("./config/thresholds.json");
    });

    test("inRange", async () => {
        let data = {
            rsvrOilTempMajorThreshold: 60,
            rsvrOilTempCriticalThreshold: 75,
            tankOilTempMajorThreshold: 45,
            tankOilTempCriticalThreshold: 55,
        };
        let result = Thresholds.inRange(data);
        expect(result).toBe(true);
        data = {
            rsvrOilTempMajorThreshold: 80,
            rsvrOilTempCriticalThreshold: 75,
            tankOilTempMajorThreshold: 65,
            tankOilTempCriticalThreshold: 55,
        };
        result = Thresholds.inRange(data);
        expect(result).toBe(false);
    });

    test("tankTempInRange", async () => {
        let range = Thresholds.range;
        expect(Thresholds.tankTempInRange(range.TANK_OIL_TEMP_MAX+1)).toBe(false);
        expect(Thresholds.tankTempInRange(range.TANK_OIL_TEMP_MAX-1)).toBe(true);
    });

    test("rsvrTempInRange", async () => {
        let range = Thresholds.range;
        expect(Thresholds.tankTempInRange(range.RSVR_OIL_TEMP_MAX+1)).toBe(false);
        expect(Thresholds.tankTempInRange(range.RSVR_OIL_TEMP_MAX-1)).toBe(true);
    });

    test("rangeTest", async () => {
        expect(Thresholds.rangeTest(1, 0, 2)).toBe(true);
        expect(Thresholds.rangeTest(0, 1, 2)).toBe(false);
        expect(Thresholds.rangeTest(3, 1, 2)).toBe(false);
    });
});
