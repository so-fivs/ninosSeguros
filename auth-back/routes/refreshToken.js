const router = require("express").Router();
const getTokenHeader = require("../auth/getTokenHeader");
const {generateAccessToken}  = require("../auth/generateTokens");
const {validateRefreshTokens } = require("../auth/validateTokens");

router.post("/", async (req,res) => {
    const refreshToken = getTokenHeader(req.headers);
    if (refreshToken){
        try{
            const found = await Token.findOne({ token:refreshToken });
            if (!found){
                return res.status(401).send(jsonResponse(401,{ error: "No autorizado" }));
            }
            const payload = validateRefreshTokens(found.token);
            if (payload){
                const accessToken = generateAccessToken(payload.user);
                return res.status(200).json(jsonResponse(200,{ accessToken}));
            }else{
                return res.status(401).send(jsonResponse(401,{ error: "No autorizado" }));
            }

        }catch(err){
            return res.status(401).send(jsonResponse(401,{ error: "No autorizado" }));
        }
    }else{
        res.status(401).send(jsonResponse(401,{ error: "No autorizado" }));
    }
    res.send("refresh token");
});

module.exports = router;