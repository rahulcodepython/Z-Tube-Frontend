import axios from "axios"
import { Decrypt } from "./Decrypt"
import { Encrypt } from "./Encrypt"

const FetchNewAccessToken = async () => {
    const values = {
        "refresh": Decrypt(localStorage.getItem("refresh"), process.env.ENCRYPTION_KEY)
    }
    await axios.post(`${process.env.BACKEND_DOMAIN_NAME}user/auth/jwt/refresh/`, values)
        .then(response => {
            sessionStorage.setItem('access', Encrypt(response.data.access, process.env.ENCRYPTION_KEY))
            localStorage.setItem('refresh', Encrypt(response.data.refresh, process.env.ENCRYPTION_KEY))
        })
        .catch(error => console.log(error))
}

export default FetchNewAccessToken