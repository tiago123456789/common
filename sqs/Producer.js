const Sqs = require("./Sqs");

class Producer extends Sqs {

    constructor(queueUrl) {
        super();
        this._queueUrl = queueUrl
    }
    
    sendMessage(params) {
        return new Promise((resolve, reject) => {
            this.getSqs().sendMessage({ 
                ...params,
                QueueUrl: this._queueUrl
            }, (err, data) => {
                if (err) {
                    reject(err); 
                    return;
                }
                resolve(data);
            })
        });
    }
}

module.exports = Producer;