const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../shema/user");
const getUserInfo = require("../lib/getUserInfo");


router.post("/", async (req,res) => {
    //cuando reviso un usuario, voy a esperar los datos
    const {username,password} = req.body;

    if(!username || !password){ // si no hay nada en x dato, envio una respuesta
        return res.status(400).json(
            jsonResponse(400, {
                error: "Campos requeridos",
            })
        );
    }

    try{//autentica usuaraio
        let user = new User();
        const userExists = await user.usernameExist(username); //valida si existe

        if (userExists) {

            user = await User.findOne({username}); //si existe busca y guarda los datos del usuario

            const corretPassword = await user.comparePassword(password, user.password); //valida password

            if (corretPassword) {//si es correcot, crea los tokens
                    //https://www.izertis.com/es/-/blog/refresh-token-con-autenticacion-jwt-implementacion-en-node-js
                const accessToken = user.createAccessToken();
                const refreshToken = await user.createRefreshToken();


                res.status(200)
                    .json(jsonResponse(200, {
                        user: getUserInfo(user),
                            accessToken,
                            refreshToken,
                        })
                    );

            } else {
                    //si se especifica, el atacante sabria mas facil cual campo tiene que buscar
                return res.status(400).json(
                    jsonResponse(400, {
                        error: "El usuario o la contrasena no es correcta",
                    })
                );
            }
        } else {
            return res.status(400).json(
                jsonResponse(400, {
                    error: "El usuario o la contrasena no es correcta",
                })
            );
        }

    }catch (e) {
        console.log(e);
    }
});

module.exports = router;