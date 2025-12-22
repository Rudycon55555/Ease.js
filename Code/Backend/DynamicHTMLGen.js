// DynamicHTMLGen.js - The Template Engine for Ease.js

const DynamicHTMLGen = {
    /**
     * @param {string} template - The HTML or Ease.js code with {{vars}}
     * @param {object} data - An object containing the variables/constants
     * @returns {string} - The processed HTML ready for the browser
     */
    generate(template, data = {}) {
        let output = template;

        // 1. Handle Variables and Constants {{name}}
        // This regex finds anything inside double curly braces
        const varRegex = /\{\{(.*?)\}\}/g;
        
        output = output.replace(varRegex, (match, key) => {
            const trimmedKey = key.trim();
            // Return the value from data, or an empty string if not found
            return data.hasOwnProperty(trimmedKey) ? data[trimmedKey] : "";
        });

        return output;
    },

    /**
     * Standardizes the Response Header for Ease.js
     * This tells the browser: "Hey, I'm sending you a real professional webpage!"
     */
    send(res, htmlContent) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'X-Powered-By': 'Ease.js'
        });
        res.end(htmlContent);
    }
};

module.exports = DynamicHTMLGen;
