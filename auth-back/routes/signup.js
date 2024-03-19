const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse")

router.post("/", (req,res) => {
    //cuando creo un nuevo usuario, voy a esperar los datos
    const {name,username,password} = req.body;

    //error si no estan los datos
    if(!!name || !!username || !!password){ // si no hay nada en x dato, envio una respuesta
        return res.status(400).json(
            jsonResponse(400, {
                error: "Campos requeridos",
            })
        );
    }

    //crear el usuario
    res.status(200).json(jsonResponse(200,{mensaje: "Usuario creado correctamente"}));
    res.send("signup");
});

module.exports = router;