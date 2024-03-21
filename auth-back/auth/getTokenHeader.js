function getTokenHeader(header) {
    //valida si viene un header con autorizacion
    if (!header.authorization) {
        throw new Error("No hay token");
    }
    //divide el header en 2 variables
    const [bearer, token] = header.authorization.split(" ");

    //valida si tiene Bearer
    if (bearer !== "Bearer") {
        throw new Error("Formato de token invalido");
    }

    return token;
}

module.exports = getTokenHeader;