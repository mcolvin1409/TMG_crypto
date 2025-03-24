const axios = require('axios');

const BASE_URL = "http://localhost:5000";

describe("network settings tests", () => {

    test("Gets the network settings", async () => {
        let url = BASE_URL + '/network/settings';
        await axios.get(url)
            .then(function (response) {
                // handle success
                expect(response.status).toBe(200);
                expect(response.data).toHaveProperty('settings');
                let settings = [
                    "dhcp",
                    "address",
                    "gateway",
                    "dns1",
                    "dns2"
                ];
                for (let i = 0; i < settings.length; i++) {
                    expect(response.data.settings).toHaveProperty(settings[i]);
                }

            })
            .catch(function (error) {
                // handle error
                console.log(error);
                throw new Error('network settings get test failed');
            })
    });

    test("Sets the network settings", async () => {
        let url = BASE_URL + '/network/settings';
        await axios.post(url, {
            "settings": {
                "dhcp": false,
                "address": "99.36.3.176:3339/24",
                "gateway": "192.168.1.12",
                "dns1": "8.8.8.8",
                "dns2": "1.1.1.1"
            }
        })
            .then(function (response) {
                // handle success
                expect(response.status).toBe(200);
                expect(response.data.success).toBe(true);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                throw new Error('network settings post test failed');
            })

    });

});
