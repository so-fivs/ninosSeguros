const jwt = require("jsonwebtoken");
require("dotenv").config();
function validateAccessTokens(token){
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
}
function validateRefreshTokens(token){
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return decoded;
}

module.exports = {validateAccessTokens, validateRefreshTokens} ;