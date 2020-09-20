const sdk = require("aws-sdk");

class Sqs {

    constructor() {
        this._sqs = this._initialize();
    }

    _initialize() {
        sdk.config.update({
            credentials: {
                secretAccessKey: process.env.SECRET_KEY_AMAZON,
                accessKeyId: process.env.ACCESS_KEY_AMAZON,
            }
        });

        return new sdk.SQS();
    }

    getSqs() {
        return this._sqs;
    }
}

module.exports = Sqs;