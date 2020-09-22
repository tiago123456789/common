const Constantes = require("./../constants/App");
const httpClient = require("../http/HttpClient");

module.exports = {

    async hasPermission(request, response, next) {
        const accessToken = request.get(Constantes.HEADER_PARAM_AUTH);
        if (accessToken == null || accessToken.length == 0) {
            return response.status(401).json({
                status: 401,
                message: "Necessario informar token de acesso!"
            });
        }

        try  {
            await httpClient.get(`${process.env.API_AUTH}auth/check`, {
                [Constantes.HEADER_PARAM_AUTH]: accessToken
            });
        } catch(error) {
            const datas = error.response.data;
            return response.status(datas.statusCode).json(datas);
        }

        return next();
    }
}