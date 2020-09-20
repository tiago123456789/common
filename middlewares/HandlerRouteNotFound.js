module.exports = (error, request, response, next) => {
    const message = {
        status: 404,
        message: "Sorry! Route not found."
    };
    response.status(message.status).json(message);
}