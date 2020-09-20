class SecurityException extends Error {

    constructor(message) {
        this.message = message;
        this.name = "SecurityException";
    }
}

module.exports = SecurityException