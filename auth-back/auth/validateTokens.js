const jwt = require("jsonwebtoken");
function validateAccessTokens(token){
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}
function validateRefreshTokens(token){
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = {validateAccessTokens, validateRefreshTokens} ;