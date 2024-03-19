const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse")


router.post("/", (req,res) => {
    //cuando reviso un usuario, voy a esperar los datos
    const {username,password} = req.body;

    //error si no estan los datos
    if(!!!username || !!!password){ // si no hay nada en x dato, envio una respuesta
        return res.status(400).json(
            jsonResponse(400, {
                error: "Campos requeridos",
            })
        );
    }

    //autentica usuaraio
    const accessToken = "accessToken";
    const refreshToken = "refreshToken";
    const user = {
        id:1,
        name:"uno",
        username:"unos",
    };
    res.status(200).json(jsonResponse(200,{user,accessToken,refreshToken, mensaje: "Logeado Ok"}));
    res.send("login");
});

module.exports = router;