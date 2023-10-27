import axios from "axios"
import { Encrypt } from "./Encrypt"

const FetchNewAccessToken = async (refreshToken) => {
    let result = null;

    const values = {
        "refresh": refreshToken
    }
    await axios.post(`${process.env.BACKEND_DOMAIN_NAME}user/auth/jwt/refresh/`, values)
        .then(response => {
            sessionStorage.setItem('access', Encrypt(response.data.access, process.env.ENCRYPTION_KEY))
            localStorage.setItem('refresh', Encrypt(response.data.refresh, process.env.ENCRYPTION_KEY))
            result = response.data;
        })
        .catch(error => {
            sessionStorage.removeItem('access')
            localStorage.removeItem('refresh')
        })

    return result;
}

export default FetchNewAccessToken