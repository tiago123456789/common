const sdk = require("aws-sdk");

class Sqs {

    constructor() {
        this._sqs = this._initialize();
    }

    _initialize() {
        sdk.config.update({
            region: process.env.REGION
        });

        return new sdk.SQS();
    }

    getSqs() {
        return this._sqs;
    }
}

module.exports = Sqs;