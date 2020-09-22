const Constantes = require("./../constants/App");
const Token = require("./../security/Token");
const token = new Token();

module.exports = {

    hasPermission(request, response, next) {
        try {
            const accessToken = request.get(Constantes.HEADER_PARAM_AUTH);
            if (accessToken == null || accessToken.length == 0) {
                return response.status(401).json({ 
                    status: 401, 
                    message: "Necessario informar token de acesso!"
                });
            }


            process.env.API_AUTH = "";




            // const eUmTokenValido = await this._tokenService.isValid(accessToken);
            
            if (!isInvalidToken) {
                return next(new SecurityException("Token is invalid or expired!"));
            }
            return next();    
        } catch(e) {
            next(e);
        }
    }
}