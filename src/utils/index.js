import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { analytics } from '@/lib/firebase/config';

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

export const GoogleLogin = () => {
    const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
    const REDIRECT_URI = 'auth/google/';

    const scope = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ].join(' ');

    const params = {
        response_type: 'code',
        client_id: process.env.GOOGLE_OAUTH2_CLIENT_ID,
        redirect_uri: `${process.env.BASE_API_URL}/${REDIRECT_URI}`,
        prompt: 'select_account',
        access_type: 'offline',
        scope
    };

    const urlParams = new URLSearchParams(params).toString();
    window.location = `${GOOGLE_AUTH_URL}?${urlParams}`;
};

export const UploadMediaFiles = async (item, uploadFilePath) => {
    let url;
    const fileref = ref(analytics, uploadFilePath);
    const response = await uploadBytes(fileref, item);
    url = await getDownloadURL(response.ref);
    return url;
}

export const DateTimeParser = (timestamp) => {
    const date = new Date(timestamp);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const twelveHourFormat = hours % 12 || 12;

    let formattedTime;
    formattedTime = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} at ${twelveHourFormat}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    return formattedTime;
}