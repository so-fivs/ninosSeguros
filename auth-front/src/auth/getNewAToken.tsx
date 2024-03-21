import { AccessTokenResponse } from "../types/types";
import { API_URL } from "./constants";
export default async function getNewAToken(refreshToken: string){
    try{
        const response = await fetch( `${API_URL}/refreshtoken`, {
            method: "POST",
            //https://dev.to/oneadvanced/different-types-of-security-token-4on#:~:text=Access%20tokens%20are%20used%20in,which%20must%20be%20a%20JWT.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
        });
        if (response.ok){
            const json = (await response.json()) as AccessTokenResponse;
            if(json.error){
                throw new Error(json.error);
            }
            return json.body.accessToken;
        }else{
            throw new Error("No se puede obtener RefreshToken");
        }
    }catch (err) {
        console.log(err);
        return null;
    }
}