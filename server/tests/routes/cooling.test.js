const axios = require('axios');

const BASE_URL = "http://localhost:5000";

describe("cooling tests", () => {

    test("Gets the cooling information", async () => {
        let url = BASE_URL + '/cooling';
        await axios.get(url)
            .then(function (response) {
                // handle success
                expect(response.status).toBe(200);
                expect(response.data.success).toBe(true);
                expect(response.data).toHaveProperty('cooling');
                let cooling = [
                    "flowMeterSensorOil",
                    "flowMeterSensorWater",
                    "fluidPressureSensorOilIn",
                    "fluidPressureSensorOilOut",
                    "fluidPressureSensorWaterIn",
                    "fluidPressureSensorWaterOut",
                    "fluidTempRtdOilIn",
                    "fluidTempRtdOilOut",
                    "fluidTempRtdWaterIn",
                    "fluidTempRtdWaterOut",
                    "fluidTempRtdOilReservoir",
                    "fluidTempRtdOilTank"
                ];
                for (let i = 0; i < cooling.length; i++) {
                    expect(response.data.cooling).toHaveProperty(cooling[i]);
                }

            })
            .catch(function (error) {
                // handle error
                console.log(error);
                throw new Error('cooling get test failed');
            })
    });

});
