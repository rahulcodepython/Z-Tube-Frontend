import axios from "axios";

export const Decrypt = (token, key) => {
    let decryptedToken = '';
    for (let i = 0; i < token?.length; i++) {
        decryptedToken += String.fromCharCode(token.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return decryptedToken;
}

export const Encrypt = (token, key) => {
    let encryptedToken = '';
    for (let i = 0; i < token?.length; i++) {
        encryptedToken += String.fromCharCode(token.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return encryptedToken;
}

export const DateTimeParser = (strdate) => {
    const formattedDate = new Date(strdate).toLocaleString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'UTC'
    });
    return formattedDate
}

export const TimeParser = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours === 0) {
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }
    else {
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
}

export const VerifyToken = async (token) => {
    try {
        await axios.post(`${process.env.BACKEND_DOMAIN_NAME}/auth/token/jwt/verify/`, { "token": token })
        return true
    } catch (error) {
        return false
    }
}

export const FetchUserData = async (token, setIsUserData, setUserData) => {
    const option = {
        headers: {
            Authorization: `JWT ${token}`
        }
    };

    await axios.get(`${process.env.BACKEND_DOMAIN_NAME}/auth/me/`, option)
        .then(response => {
            setIsUserData(pre => true);
            setUserData(pre => response.data);
            sessionStorage.setItem("user", Encrypt(JSON.stringify(response.data), process.env.ENCRYPTION_KEY));
        })
}

export const AuthenticateUser = async (access, refresh, user_data, setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setAccessToken, setRefreshToken, setIsUserData, setUserData) => {
    setIsAuthenticated(pre => true);
    setIsAccessToken(pre => true);
    setAccessToken(pre => access);
    setIsRefreshToken(pre => true);
    setRefreshToken(pre => refresh);
    setIsUserData(pre => true);
    setUserData(pre => user_data)
}

export const ValidateUser = async (access, refresh, setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setAccessToken, setRefreshToken) => {
    setIsAuthenticated(pre => true);
    setIsAccessToken(pre => true);
    setAccessToken(pre => access);
    setIsRefreshToken(pre => true);
    setRefreshToken(pre => refresh);
    sessionStorage.setItem('access', Encrypt(access, process.env.ENCRYPTION_KEY));
    localStorage.setItem('refresh', Encrypt(refresh, process.env.ENCRYPTION_KEY));
}

export const RevalidateAccessToken = async (token) => {
    await axios.post(`${process.env.BACKEND_DOMAIN_NAME}/auth/token/jwt/refresh/`, { "refresh": token })
        .then(async response => {
            await ValidateUser(response.data.access, response.data.refresh, setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setAccessToken, setRefreshToken);
        })
}

export const LogoutUser = async (setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setIsUserData, setAccessToken, setRefreshToken, setUserData) => {
    setIsAuthenticated(pre => false);
    setIsAccessToken(pre => false);
    setAccessToken(pre => null);
    setIsRefreshToken(pre => false);
    setRefreshToken(pre => null);
    setIsUserData(pre => false)
    setUserData(pre => null)
    sessionStorage.removeItem('access');
    localStorage.removeItem('refresh');
    sessionStorage.removeItem('user');
}

export const AutoLoginUser = async (email, password, setIsValidated, setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setAccessToken, setRefreshToken, setIsUserData, setUserData) => {
    const values = {
        "email": email,
        "password": password
    }

    await axios.post(`${process.env.BACKEND_DOMAIN_NAME}/auth/token/jwt/create/`, values)
        .then(async response => {
            await ValidateUser(response.data.access, response.data.refresh, setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setAccessToken, setRefreshToken)
            setIsValidated(pre => true)
            localStorage.removeItem('email')
            localStorage.removeItem('password')
        })
        .catch(async error => {
            await LogoutUser(setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setIsUserData, setAccessToken, setRefreshToken, setUserData)
            setIsValidated(pre => false)
        });
}

export const FetchFeedPost = async (accessToken, setPosts) => {
    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        }
    };

    await axios.get(`${process.env.BACKEND_DOMAIN_NAME}/feed/posts/`, options)
        .then(response => setPosts(response.data))
        .catch(error => { });
}