function getTokenHeader(header) {
    if (!header.authorization) {
        throw new Error("No hay token");
    }

    const [bearer, token] = header.authorization.split(" ");

    if (bearer !== "Bearer") {
        throw new Error("Formato de token invalido");
    }

    return token;
}

module.exports = getTokenHeader;