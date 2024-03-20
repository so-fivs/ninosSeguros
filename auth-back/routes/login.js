const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../shema/user");
const getUserInfo = require("../lib/getUserInfo");


router.post("/", async (req,res) => {
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
    const user = await User.findOne( {username} );

    if(user){
        const corretPassword = await user.comparePassword(password, user.password);

        if(corretPassword){
            //https://www.izertis.com/es/-/blog/refresh-token-con-autenticacion-jwt-implementacion-en-node-js
            const accessToken = user.createAccessToken();
            const refreshToken = await user.createRefreshToken();


            res.status(200)
                .json(jsonResponse(200,{
                    user: getUserInfo(user),
                    accessToken,
                    refreshToken,
                    mensaje: "Logeado Ok",
                    })
                );

        }else{
            //si se especifica, el atacante sabria mas facil cual campo tiene que buscar
            return res.status(400).json(
                jsonResponse(400, {
                    error: "El usuario o la contrasena no es correcta",
                })
            );
        }
    }else{
        return res.status(400).json(
            jsonResponse(400, {
                error: "El usuario o la contrasena no es correcta",
            })
        );
    }

});

module.exports = router;