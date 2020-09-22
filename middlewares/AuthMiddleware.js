const Constantes = require("./../constants/App");
const httpClient = require("../http/HttpClient");
const Token = require("./../security/Token");
const token = new Token();

module.exports = {

    hasPermission(request, response, next) {
        const accessToken = request.get(Constantes.HEADER_PARAM_AUTH);
        if (accessToken == null || accessToken.length == 0) {
            return response.status(401).json({
                status: 401,
                message: "Necessario informar token de acesso!"
            });
        }

        const response = await httpClient.get(`${process.env.API_AUTH}auth/check`, {
            [Constantes.HEADER_PARAM_AUTH]: accessToken
        });

        const isInvalidToken = response.statusCode == 403;
        if (isInvalidToken) {
            return next(new SecurityException(response.message));
        } else {
            return next();
        }
    }
}