const router = require("express").Router();
const getTokenHeader = require("../auth/getTokenHeader");
const {generateAccessToken}  = require("../auth/generateTokens");
const { jsonResponse } = require("../lib/jsonResponse");
const {validateRefreshTokens } = require("../auth/validateTokens");
const Token = require("../shema/token");
const getUserInfo = require("../lib/getUserInfo");

router.post("/", async (req,res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken){
        try{
            const found = await Token.findOne({ token:refreshToken });
            if (!found){
                return res.status(403).json({ error: "No es valido el token" });
            }
            const payload = validateRefreshTokens(found.token);
            if (payload){
                const accessToken = generateAccessToken(getUserInfo(payload.user));
                return res.json(jsonResponse(200, { accessToken }));
            }else{
                return res.status(403).json({ error: "No autorizado" });
            }

        }catch(err){

            return res.status(403).json({ error: "No es valido el token" });
        }
    }else{

        return res.status(403).json({ error: "No hay token" });
    }
    return res.send("refresh token");
});

module.exports = router;