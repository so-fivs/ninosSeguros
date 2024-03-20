const router = require("express").Router();
const getTokenHeader = require("../auth/getTokenHeader");
const {generateAccessToken}  = require("../auth/generateTokens");
const { jsonResponse } = require("../lib/jsonResponse");
const {validateRefreshTokens } = require("../auth/validateTokens");
const Token = require("../shema/token");

router.post("/", async (req,res) => {
    const refreshToken = getTokenHeader(req.headers);
    if (refreshToken){
        try{
            const found = await Token.findOne({ token:refreshToken });
            if (!found){
                return res.status(403).json({ error: "No autorizado" });
            }
            const payload = validateRefreshTokens(found.token);
            if (payload){
                const accessToken = generateAccessToken(payload.user);
                return res.json({ accessToken });
            }else{
                return res.status(403).json({ error: "No autorizado" });
            }

        }catch(err){

            console.log("entra mal")
            return res.status(403).json({ error: "No autorizado" });
        }
    }else{

        return res.status(403).json({ error: "No autorizado" });
    }
    return res.send("refresh token");
});

module.exports = router;