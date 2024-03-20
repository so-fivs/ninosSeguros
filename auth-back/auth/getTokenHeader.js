function getTokenHeader(headers) {
    console.log(headers.authorization);
    if (headers && headers.authorization){
        const parted = headers.authorization.split(' ');
        console.log(parted);
        if (parted.length == 2){
            return parted[1];
        }else{
            return null;
        }
    }else{
        return null;
    }
}

module.exports = getTokenHeader;