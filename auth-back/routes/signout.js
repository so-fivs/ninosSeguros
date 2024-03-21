const router = require("express").Router();
const getTokenHeader = require("../auth/getTokenHeader");
const { jsonResponse } = require("../lib/jsonResponse");
const Token = require("../shema/token");


router.delete("/", async (req,res) => {
    try {
        //valida los headers y recupera el token
        const refreshToken = getTokenHeader(req.headers);
        if (refreshToken){
            //elimina el token
            await Token.findOneAndDelete({ token: refreshToken });
            res.status(200).json(jsonResponse(200,{message : "token eliminado"}));
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(200,{message : "No se pudo cerrar sesion"}));
    }
});

module.exports = router;