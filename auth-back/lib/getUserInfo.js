function getUserInfo(user) {
    return{
        name: user.name,
        username: user.username,
        id: user.id,
    };
}
module.exports = getUserInfo;