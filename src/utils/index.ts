import type {AccessToken} from "@/context/AuthContext";
import { ref, uploadBytes, getDownloadURL, StorageReference } from 'firebase/storage'
import {analytics} from "@/utils/firebase-config";

export const Decrypt = (token: AccessToken, key: String|undefined) => {
    let decryptedToken = '';
    if (token && key) {
        for (let i = 0; i < token?.length; i++) {
            decryptedToken += String.fromCharCode(token.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
    }
    return decryptedToken;
}

export const Encrypt = (token: AccessToken, key: String|undefined) => {
    let encryptedToken = '';
    if (token && key) {
        for (let i = 0; i < token?.length; i++) {
            encryptedToken += String.fromCharCode(token.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
    }
    return encryptedToken;
}

interface FileObject extends File {}

export const UploadMediaFiles = async (item: FileObject, uploadFilePath: string): Promise<string> => {
    let url: string;
    const fileref: StorageReference = ref(analytics, uploadFilePath);
    const response = await uploadBytes(fileref, item);
    url = await getDownloadURL(response.ref);
    return url;
};
