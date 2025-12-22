// Security.js - The Ease.js Shield (Updated)
const fs = require('fs');
const path = require('path');

const Security = {
    // 1. Enhanced Sanitization
    // Blocks $, ../, and other "shell-jumping" characters
    sanitize(input) {
        if (typeof input !== 'string') return input;
        
        // Remove suspicious URL/Path patterns
        let clean = input
            .replace(/\.\.\//g, "") // Blocks ../ (Directory Traversal)
            .replace(/\$/g, "")     // Blocks $ (Variable Injection)
            .replace(/[&|;<>]/g, ""); // Blocks Shell Operators

        return clean;
    },

    // 2. URL Path Protector
    // Checks the actual URL requested by the browser
    isUrlSafe(url) {
        // If the URL contains ../ or $, it's an immediate red flag
        if (url.includes('../') || url.includes('$')) {
            console.error(`🚨 Security Alert: Blocked suspicious URL: ${url}`);
            return false;
        }
        return true;
    },

    // 3. Pre-API Authentication
    validateAPICall(headers) {
        const authKey = headers['x-ease-auth'];
        // Professional APIs usually require a long key
        if (!authKey || authKey.length < 73) {
            console.error("⚠️ Security Alert: Unauthenticated API call blocked.");
            return false;
        }
        return true;
    },

    // 4. Legal Compliance Check
    checkLegalCompliance(projectPath) {
        const legalPath = path.join(projectPath, 'Describe/Legal.txt');
        if (!fs.existsSync(legalPath)) {
            console.warn("⚠️ Ease.js Compliance Warning: No Legal.txt found in Describe/");
            return false;
        }
        return true;
    }
};

module.exports = Security;
