const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserShema = new Mongoose.Shema({
    id: { type: Object },
    name: { type: String, required:true },
    username:{ type: String, required:true, unique:true },
    password:{ type: String, required:true },
});

UserShema.pre("save", function(next){
    if (this.isModified("password") || this.isNew) {
        const document = this;
//https://www.izertis.com/es/-/blog/encriptacion-de-password-en-nodejs-y-mongodb-bcrypt#:~:text=Lleva%20incorporado%20un%20valor%20llamado,en%20la%20base%20de%20datos.
        bcrypt.hash(document.password,10, (err,hash) =>{
            if(err){
                next(err);
            }else{
                document.password = hash;
                next();
            }
        });

    }else{
        next();
    }
});