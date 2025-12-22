// Identity.js - The Ease.js User Manager
const Cryptography = require('./Cryptography');

const Identity = {
    // Taking: Captures user info and secures it
    secureUserCredentials(password, username) {
        // Use the username as a salt to make the hash unique
        const passwordHash = Cryptography.hash(password, username);
        return passwordHash;
    },

    // Using: Creates a secure session cookie using encryption
    createSecureSession(userId, secretKey) {
        const sessionData = JSON.stringify({ id: userId, time: Date.now() });
        // Encrypt the session so the user can't read their own ID
        const encryptedSession = Cryptography.encrypt(sessionData, secretKey);
        return Buffer.from(JSON.stringify(encryptedSession)).toString('base64');
    },

    // Extracting: Decrypts the cookie to see who the user is
    parseSession(base64Session, secretKey) {
        const encryptedObj = JSON.parse(Buffer.from(base64Session, 'base64').toString());
        const decryptedStr = Cryptography.decrypt(encryptedObj, secretKey);
        return JSON.parse(decryptedStr);
    }
};

module.exports = Identity;
