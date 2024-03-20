const router = require("express").Router();
const getTokenHeader = require("../auth/getTokenHeader");
const { jsonResponse } = require("../lib/jsonResponse");

router.delete("/", async (req,res) => {
    try {
        const refreshToken = getTokenHeader(req.headers);
        if (refreshToken){
            await Token.findOneAndRemove({ token: refreshToken });
            res.status(200).json(jsonResponse(200,{message : "token eliminado"}));
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(200,{message : "Server error"}));
    }
});

module.exports = router;