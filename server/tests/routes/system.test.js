const axios = require('axios'),
    Fluid = require("../../domain/Fluid.js");

const BASE_URL = "http://localhost:5000";

function handleError(error, message) {
    // handle error
    console.error(error);
    throw new Error(message);
}

describe("system health test", () => {

    test("Gets the system health", async () => {
        let url = BASE_URL + '/system/health';
        await axios.get(url)
            .then(function (response) {
                // handle success
                expect(response.status).toBe(200);
                expect(response.data.success).toBe(true);
                expect(response.data).toHaveProperty('health');
            })
            .catch(function (error) {
                handleError(error, 'system health get test failed');
            })
    });
});


describe("system fluids test", () => {

    test("Gets the system fluids", async () => {
        let url = BASE_URL + '/system/fluids';

        await axios.get(url)
            .then(function (response) {
                // handle success
                expect(response.status).toBe(200);
                expect(response.data).toHaveProperty('fluids');
            })
            .catch(function (error) {
                handleError(error, 'system fluids get test failed');
            })
    });

    test("Sets a system fluid", async () => {
        let url = BASE_URL + '/system/fluids';
        await axios.post(url, {
            "fluid": "ENGINEERED_FLUIDS_BC_888"
        })
            .then(function (response) {
                // handle success
                expect(response.status).toBe(200);
                expect(response.data.success).toBe(true);
                expect(response.data).toHaveProperty('properties');
            })
            .catch(function (error) {
                handleError(error, 'system fluids post test failed');
            })
    });
});

describe("system props test", () => {

    test("Gets the system props", async () => {
        let url = BASE_URL + '/system/props';
        await axios.get(url)
            .then(function (response) {
                // handle success
                expect(response.status).toBe(200);
                expect(response.data).toHaveProperty('properties');
                let properties = [
                    "unitId",
                    "product",
                    "version",
                    "revision",
                    "factory",
                    "manufactured",
                    "water",
                    "electrical",
                    "fluid"
                ];
                for (let i=0; i<properties.length; i++) {
                    expect(response.data.properties).toHaveProperty(properties[i]);
                }

            })
            .catch(function (error) {
                handleError(error, 'system props get test failed');
            })
    });
});

describe("system NTP test", () => {

    it("Sets NTP Servers", async () => {
        let url = BASE_URL + '/system/ntp/servers';
        await axios.post(url, {
            "primary": "time-a-b.nist.gov",
            "secondary": "time.nist.gov"
        })
            .then(function (response) {
                // handle success
                expect(response.status).toBe(200);
                expect(response.data.success).toBe(true);
            })
            .catch(function (error) {
                handleError(error, 'system ntp servers post test failed');
            })
    });
});
