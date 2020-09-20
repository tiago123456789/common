class SecurityException extends Error {

    constructor(message) {
        super();
        this.message = message;
        this.name = "SecurityException";
    }
}

module.exports = SecurityException