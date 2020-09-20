
class BusinessLogicException extends Error {

    constructor(message) {
        super();
        this.message = message;
        this.name = "BusinessLogicException";
    }
}

module.exports = BusinessLogicException;