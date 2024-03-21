function getUserInfo(user) {
    //para no llevar todo los datos del usuario
    return{
        name: user.name,
        username: user.username,
        id: user.id || user._id,
    };
}
module.exports = getUserInfo;