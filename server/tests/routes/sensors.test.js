const axios = require('axios');

const BASE_URL = "http://localhost:5000";

describe("sensor threshold value test", () => {

    test("Gets the sensor threshold value", async () => {
        let url = BASE_URL + '/sensors';
        await axios.get(url)
            .then(function (response) {
                // handle success
                expect(response.status).toBe(200);
                expect(response.data).toHaveProperty('alarmThresholds');
                let thresholds = [
                    "rsvrOilTempMajorThreshold",
                    "rsvrOilTempCriticalThreshold",
                    "tankOilTempMajorThreshold",
                    "tankOilTempCriticalThreshold"
                ];
                for (let i=0; i<thresholds.length; i++) {
                    expect(response.data.alarmThresholds).toHaveProperty(thresholds[i]);
                }

            })
            .catch(function (error) {
                // handle error
                console.log(error);
                throw new Error('sensor thresholds get test failed');
            })
    });

    test("Sets sensor threshold value", async () => {
        let url = BASE_URL + '/sensors';
        await process.nextTick(() => {});
        await axios.post(url, {
            "rsvrOilTempMajorThreshold": 60,
            "rsvrOilTempCriticalThreshold": 75,
            "tankOilTempMajorThreshold": 45,
            "tankOilTempCriticalThreshold": 55
        })
            .then(function (response) {
                // handle success
                expect(response.status).toBe(200);
                expect(response.data.success).toBe(true);
                expect(response.data).toHaveProperty('message');
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                throw new Error('sensor threshold post test failed');
            })
    });

});

describe("sensor alarm tests", () => {

    test("Gets the current state of sensor alarms", async () => {
        let url = BASE_URL + '/sensors/alarms';
        await axios.get(url)
            .then(function (response) {
                // handle success
                expect(response.status).toBe(200);
                expect(response.data).toHaveProperty('alarms');
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                throw new Error('sensor alarm state get test failed');
            })
    });

    test("Set all alarms to OFF state", async () => {
        let url = BASE_URL + '/sensors/restart';
        await axios.get(url)
            .then(function (response) {
                // handle success
                expect(response.status).toBe(200);
                expect(response.data).toHaveProperty('success');
                expect(response.data.success).toBe(true);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                throw new Error('sensor alarm state get test failed');
            })
    });

    test("Clear an individual alarm", async () => {
        let url = BASE_URL + '/sensors/clear';
        await process.nextTick(() => {});
        await axios.post(url, {
            "clear": "rsvrOilTemp"
        })
            .then(function (response) {
                // handle success
                expect(response.status).toBe(200);
                expect(response.data.success).toBe(true);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                throw new Error('sensor clear alarm post test failed');
            })
    });

});
