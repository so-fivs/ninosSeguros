function getTokenHeader(headers) {
    if (headers && headers.auth){
        const parted = headers.auth.split(' ');
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