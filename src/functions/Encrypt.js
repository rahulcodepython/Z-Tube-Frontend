export const Encrypt = (token, key) => {
    let encryptedToken = '';
    for (let i = 0; i < token.length; i++) {
        encryptedToken += String.fromCharCode(token.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return encryptedToken;
}