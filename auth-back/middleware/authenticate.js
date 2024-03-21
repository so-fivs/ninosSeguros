const getTokenHeader = require("../auth/getTokenHeader");
const {validateAccessTokens } = require("../auth/validateTokens");
const { jsonResponse } = require("../lib/jsonResponse");
function authenticate(req,res,next) {
    const token = getTokenHeader(req.headers);
    //valida si existe un token
    if (token){
        //valida que el token sirva
        const decoded = validateAccessTokens(token)
        if (decoded){
            //guarda la informacion del usuario autenticado
            req.user = { ...decoded.user};
            next();
        }else{
            res.status(401).send(jsonResponse(401,{ error: "No hay token" }));
        }

    }else{
        res.status(401).send(jsonResponse(401,{ error: "No hay token" }));
    }
}

module.exports = authenticate;