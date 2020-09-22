const jwt = require("jsonwebtoken");
const Constants = require("../constants/App");

module.exports = {

    build(datas) {
        return jwt.sign(datas, process.env.SECRET, { expiresIn: process.env.EXPIRATION_TIME });
    },

    isValid(token) {
        return new Promise((resolve, reject) => {
            return jwt.verify(token, process.env.SECRET, function (err, decoded) {
                if (err) {
                    reject(false);
                }
                resolve(true);
            });
        });
    },

    getValueInPayload(key, token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET, function (err, decoded) {
                if (err) reject(null);
                const value = decoded[key] || null;
                resolve(value);
            });
        });
    },

    getWithoutPrefix(token) {
        return token.replace(Constants.HEADER_PREFIX_TOKEN, "");
    }
}