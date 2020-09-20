
class InvalidDatasException extends Error {

    constructor(message) {
        super();
        this.message = message;
        this.name = "InvalidDatasException";
    }
}

module.exports = InvalidDatasException;