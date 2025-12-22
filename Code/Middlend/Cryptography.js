// Cryptography.js - The Ease.js Math Vault
const crypto = require('crypto');

const Cryptography = {
    // AES-256-GCM is the professional standard for encryption
    encrypt(plaintext, customKey) {
        const iv = crypto.randomBytes(16); // Initialization vector
        // Ensure key is 32 bytes for AES-256
        const key = crypto.scryptSync(customKey, 'salt', 32); 
        const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
        
        let encrypted = cipher.update(plaintext, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const authTag = cipher.getAuthTag().toString('hex');

        // We return a "Package" that includes the pieces needed to decrypt
        return {
            content: encrypted,
            iv: iv.toString('hex'),
            tag: authTag
        };
    },

    decrypt(encryptedObj, customKey) {
        const key = crypto.scryptSync(customKey, 'salt', 32);
        const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(encryptedObj.iv, 'hex'));
        decipher.setAuthTag(Buffer.from(encryptedObj.tag, 'hex'));

        let decrypted = decipher.update(encryptedObj.content, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    },

    // Using scrypt for hashing (Secure alternative to Argon2 for pure Node.js)
    hash(data, customSalt) {
        // Returns a 64-byte hex string
        return crypto.scryptSync(data, customSalt, 64).toString('hex');
    }
};

module.exports = Cryptography;
