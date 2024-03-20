const getTokenHeader = require("../auth/getTokenHeader");
const {validateAccessTokens } = require("../auth/validateTokens");
const { jsonResponse } = require("../lib/jsonResponse");
function authenticate(req,res,next) {
    const token = getTokenHeader(req.headers);
    if (token){
        const decode = validateAccessTokens(token)
        if (decode){
            req.user = { ...decode.user};
            next();
        }else{
            res.status(401).send(jsonResponse(401,{ error: "No hay token" }));
        }

    }else{
        res.status(401).send(jsonResponse(401,{ error: "No hay token" }));
    }
}

module.exports = authenticate;