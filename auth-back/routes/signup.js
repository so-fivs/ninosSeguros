const express = require("express");
const User = require("../shema/user");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

router.post("/", async (req,res) => {
    //cuando creo un nuevo usuario, voy a esperar los datos
    const {name,username,password} = req.body;

    //error si no estan los datos
    if(!!!name || !!!username || !!!password){ // si no hay nada en x dato, envio una respuesta
        return res.status(400).json(
            jsonResponse(400, {
                error: "Campos requeridos",
            })
        );
    }

    //crear el usuario
    try {
        const user = new User();
        const exist = await user.usernameExist(username);

        if (exist) {
            return res.status(400).json(
                jsonResponse(400, {
                    error: "El usuario ya existe",
                })
            );
        }else {
            const newUser = new User({ name, username, password });

            newUser.save();
            res.status(200).json(jsonResponse(200, {mensaje: "Usuario creado correctamente"}));
        }
    }catch(error){
    res.status(500).json(
        jsonResponse(500, {
            error: "Error creando el usuario",
        })
    );
}

});
module.exports = router;