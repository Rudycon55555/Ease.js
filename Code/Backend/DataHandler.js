// DataHandler.js - Global Data Engine for Ease.js
const fs = require('fs');
const path = require('path');
const Security = require('../Middlend/Security');

const DataHandler = {
    // --- FORMAT CONVERTERS ---
    
    // Developer can use these to just transform data without saving
    toFormat(data, format = 'json') {
        if (format === 'yaml') {
            return Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n');
        }
        if (format === 'xml') {
            let xml = '<root>\n';
            for (let [k, v] of Object.entries(data)) {
                xml += `  <${k}>${v}</${k}>\n`;
            }
            return xml + '</root>';
        }
        return JSON.stringify(data, null, 2);
    },

    fromFormat(string, format = 'json') {
        if (format === 'yaml') {
            let obj = {};
            string.split('\n').forEach(line => {
                const parts = line.split(':');
                if (parts.length > 1) obj[parts[0].trim()] = parts[1].trim();
            });
            return obj;
        }
        if (format === 'xml') {
            let obj = {};
            const matches = string.matchAll(/<(\w+)>(.*?)<\/\1>/g);
            for (const m of matches) obj[m[1]] = m[2];
            return obj;
        }
        return JSON.parse(string);
    },

    // --- DISK OPERATIONS ---

    // Now accepts a fullPath chosen by the developer
    save(fullPath, data, format = 'json') {
        // Double check for hackers trying to climb folders
        if (!Security.isUrlSafe(fullPath)) {
            throw new Error("Ease.js Security: Unauthorized Path Access Blocked.");
        }

        const content = this.toFormat(data, format);
        fs.writeFileSync(fullPath, content);
        return true;
    },

    load(fullPath, format = 'json') {
        if (!Security.isUrlSafe(fullPath) || !fs.existsSync(fullPath)) return null;
        const raw = fs.readFileSync(fullPath, 'utf-8');
        return this.fromFormat(raw, format);
    },

    // --- QUERY & EDIT ---

    async edit(fullPath, key, newValue, format = 'json') {
        let data = this.load(fullPath, format) || {};
        data[key] = newValue;
        return this.save(fullPath, data, format);
    },

    async remove(fullPath, key, format = 'json') {
        let data = this.load(fullPath, format);
        if (data && data[key]) {
            delete data[key];
            return this.save(fullPath, data, format);
        }
        return false;
    }
};

module.exports = DataHandler;
