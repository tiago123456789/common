class ForbiddenException extends Error {

    constructor(message) {
        super();
        this.message = message;
        this.name = "ForbiddenException";
    }
}

module.exports = ForbiddenException