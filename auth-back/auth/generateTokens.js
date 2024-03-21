const jwt = require("jsonwebtoken")
//
function sign(payload, isAccessToken){
    return jwt.sign(payload, //usuario
                    isAccessToken  //valida si es un token de acceso o uno de refresco
                        ? process.env.ACCESS_TOKEN_SECRET //true
                        : process.env.REFRESH_TOKEN_SECRET, //false
                    {//se puede separar segun el tipo de token
                        algorithm: "HS256", //predeterminado algoritmo que se usara para generar los tokens
                        expiresIn: 3600, //tiempo de vida del token
                    }
    );
}

function generateAccessToken(user){
    return sign({ user }, true);
}
function generateRefreshToken(user){
    return sign({ user }, false);
}

module.exports = { generateAccessToken, generateRefreshToken };