const cache = require("../cache/Cache");
const moment = require("moment");
const rateLimit = require("express-rate-limit");
const WINDOW_SIZE_IN_HOURS = 24;
const MAX_WINDOW_REQUEST_COUNT = 5;
const WINDOW_LOG_INTERVAL_IN_HOURS = 1;

const rateLimiterUsingThirdParty = rateLimit({
    windowMs: WINDOW_SIZE_IN_HOURS * 60 * 60 * 1000, // 24 hrs in millseconds
    max: MAX_WINDOW_REQUEST_COUNT,
    message: `You have exceeded the ${MAX_WINDOW_REQUEST_COUNT} requests in ${WINDOW_SIZE_IN_HOURS} hrs limit!`,
    headers: true
});


module.exports = async (request, response, next) => {
    const ip = request.ip;
    try {
        let record = await cache.get(ip);
        const currentRequestTime = moment();
        if (!record) {
            let newRecord = [];
            let requestLog = {
                requestTimeStamp: currentRequestTime.unix(),
                requestCount: 1
            };
            newRecord.push(requestLog);
            cache.set(ip, JSON.stringify(newRecord), rateLimiterUsingThirdParty.windowMs);
            next();
        } else {
            record = JSON.parse(record);
            let windowStartTimestamp = moment()
                .subtract(WINDOW_SIZE_IN_HOURS, 'hours')
                .unix();

            let requestsWithinWindow = record.filter(entry => {
                return entry.requestTimeStamp > windowStartTimestamp;
            });

            let totalWindowRequestsCount = requestsWithinWindow.reduce((accumulator, entry) => {
                return accumulator + entry.requestCount;
            }, 0);

            const isGreatherThanOrEqualNumberRequest = totalWindowRequestsCount >= MAX_WINDOW_REQUEST_COUNT;
            if (isGreatherThanOrEqualNumberRequest) {
                response
                    .status(429)
                    .json(
                        {
                            statusCode: 429,
                            message: rateLimiterUsingThirdParty.message
                        }
                    )
            } else {
                let lastRequestLog = record[record.length - 1];
                let potentialCurrentWindowIntervalStartTimeStamp = currentRequestTime
                    .subtract(WINDOW_LOG_INTERVAL_IN_HOURS, 'hours')
                    .unix();

                if (lastRequestLog.requestTimeStamp > potentialCurrentWindowIntervalStartTimeStamp) {
                    lastRequestLog.requestCount++;
                    record[record.length - 1] = lastRequestLog;
                } else {
                    record.push({
                        requestTimeStamp: currentRequestTime.unix(),
                        requestCount: 1
                    });
                }
                cache.set(ip, JSON.stringify(record), rateLimiterUsingThirdParty.windowMs);
                next();
            }
        }
    } catch (error) {
        next(error);
    }
}