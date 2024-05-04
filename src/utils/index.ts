import type { AccessToken } from "@/context/AuthContext";
import { ref, uploadBytes, getDownloadURL, StorageReference } from 'firebase/storage'
import { analytics } from "@/utils/firebase-config";

export const Decrypt = (token: AccessToken, key: String | undefined) => {
    let decryptedToken = '';
    if (token && key) {
        for (let i = 0; i < token?.length; i++) {
            decryptedToken += String.fromCharCode(token.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
    }
    return decryptedToken;
}

export const Encrypt = (token: AccessToken, key: String | undefined) => {
    let encryptedToken = '';
    if (token && key) {
        for (let i = 0; i < token?.length; i++) {
            encryptedToken += String.fromCharCode(token.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
    }
    return encryptedToken;
}

export const UploadMediaFiles = async (item: File | undefined, uploadFilePath: string): Promise<string> => {
    let url: string;
    if (item) {
        const fileref: StorageReference = ref(analytics, uploadFilePath);
        const response = await uploadBytes(fileref, item);
        url = await getDownloadURL(response.ref);
        return url;
    }
    return ''
};

export const DateTimeParser = (timestamp: number) => {
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