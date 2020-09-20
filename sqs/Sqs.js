const sdk = require("aws-sdk");

class Sqs {

    constructor() {
        this._sqs = this._initialize();
    }

    _initialize() {
        sdk.config.update({
            region: process.env.REGION,
            credentials: {
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                accessKeyId: process.env.AWS_SECRET_ACCESS_KEYs,
            }
        });

        return new sdk.SQS();
    }

    getSqs() {
        return this._sqs;
    }
}

module.exports = Sqs;