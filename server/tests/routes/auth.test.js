const axios = require('axios');

const BASE_URL = "http://localhost:5000";

function handleError (error) {
    console.error(error);
}

describe("auth tests", () => {

    test("Validate password", async () => {
        let url = BASE_URL + '/auth';
        await axios.post(url, {
            "password": "1234"
        })
            .then(function (response) {
                // handle success
                expect(response.status).toBe(200);
                expect(response.data.success).toBe(true);
            })
            .catch(handleError)
    });

    test("Initializes authentication", async () => {
        let url = BASE_URL + '/auth/initialize';
        await axios.post(url, {
            "password": "1234"
        })
            .then(function (response) {
                // handle success
                expect(response.status).toBe(200);
                expect(response.data.success).toBe(true);
            })
            .catch(handleError)
    });

    test("Changes password", async () => {
        let url = BASE_URL + '/auth/change';
        await axios.post(url, {
            "currentPassword": "1234",
            "newPassword": "1234"
        })
            .then(function (response) {
                // handle success
                expect(response.status).toBe(200);
                expect(response.data.success).toBe(true);
            })
            .catch(handleError)
    });
});
