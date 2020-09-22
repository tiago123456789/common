const axios = require("axios");

module.exports = {

    get(url, headers) {
        return axios.get(url, { headers: headers }).then(response => response.data)
    }
}