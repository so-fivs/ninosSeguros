const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../auth/generateTokens");
const getUserInfo = require("../lib/getUserInfo");
const Token = require("../shema/token");

const UserSchema = new Mongoose.Schema({
    id: { type: Object },
    name: { type: String, required:true },
    username:{ type: String, required:true, unique:true },
    password:{ type: String, required:true },
});

UserSchema.pre("save", function(next){
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
UserSchema.methods.usernameExist = async function(username){
    const result = await Mongoose.model('User').findOne({username});
    //const result = await Mongoose.model('User').find({username});
    //return result.lenght > 0;
    return !!result;
};
UserSchema.methods.comparePassword = async function(password, hash){
    const same = await bcrypt.compare(password,hash);
    return same;
};

UserSchema.methods.createAccessToken = function(){
    return generateAccessToken(getUserInfo(this));
};
UserSchema.methods.createRefreshToken = async function(){
    const refreshToken = generateRefreshToken(getUserInfo(this));
    try{
        await new Token({ token: refreshToken }).save();
        return refreshToken;
    }catch(err){
        console.log(err);
    }
};

module.exports = Mongoose.model("User", UserSchema);