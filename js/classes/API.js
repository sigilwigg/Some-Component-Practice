// ========== [///// API CLASS /////] ==========
class API {
    static BASE_URL = "http://localhost:3001";
    static token;

    // ----- USER LOGIN/REGISTER -----
    static async login(name, password) {
        console.debug("API Call:", "login");

        const url = `${API.BASE_URL}/auth/login`;

        try {
            let res = await axios.post(url, { name, password });
            return res.data;
        } catch (err) {
            API.handleError(err);
        }
    }

    static async register(user) {
        console.debug("API Call:", "register");

        const url = `${API.BASE_URL}/auth/register`;

        try {
            let res = await axios.post(url, user);
            return res.data;
        } catch (err) {
            API.handleError(err);
        }
    }

    // ----- CREATE -----

    // ----- REQUEST -----
    static async request(endpoint) {
        console.debug("API Call:", endpoint, "request");

        const url = `${API.BASE_URL}/${endpoint}`;

        try {
            let res = await axios.get(url);
            return res;
        } catch (err) {
            API.handleError(err);
        }
    }

    // ----- UPDATE -----

    // ----- DELETE -----

    // ----- ERROR HANDLING -----
    static handleError(err) {
        console.error("API Error:", err.response);
        let message = err.response.data.error.message;
        throw Array.isArray(message) ? message : [message];
    }
}

