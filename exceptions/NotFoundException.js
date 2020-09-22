
class NotFoundException extends Error {

    constructor(message) {
        super();
        this.message = message;
        this.name = "NotFoundException";
    }
}

module.exports = NotFoundException;