// Runtime.js - The Main Engine of Ease.js
const fs = require('fs');
const path = require('path');

// Import our framework components
const Security = require('./Security');
const UIadding = require('../Frontend/UIadding');
const Styling = require('../Frontend/Styling');
const IMGRendering = require('../Frontend/IMG_Rendering-Scripting');
const Decorators = require('./Decorators');
const DynamicHTML = require('../Backend/DynamicHTMLGen');
// Runtime.js - Updated for Ease.js v2.0.0
const fs = require('fs');
const path = require('path');

// Import the new Status Engine
const Codes = require('./CustomHTTPcodes');
const Security = require('./Security');
const Decorators = require('./Decorators');

const Runtime = {
    interpret(rawCode, res) { // Added 'res' to handle errors mid-process
        let processedCode = rawCode;

        // 1. SECURITY CHECK: If malicious, send EASE_SECURITY_SHIELD (600)
        if (!Security.isUrlSafe(processedCode)) {
            Codes.send(res, Codes.EASE_SECURITY_SHIELD, "Malicious characters detected in source.");
            return null;
        }

        // 2. DECORATOR CHECK: If missing, send EASE_DECORATOR_MISSING (602)
        const decoratorRegex = /~@~([\w]+)\s*\{([\s\S]*?)\}/g;
        processedCode = processedCode.replace(decoratorRegex, (match, name, content) => {
            if (!Decorators.registry[name]) {
                Codes.send(res, Codes.EASE_DECORATOR_MISSING, `Decorator ~@~${name} is not defined.`);
                throw new Error("Ease.js: Execution Halted."); 
            }
            return Decorators.call(name, content.trim());
        });

        return processedCode;
    },

    handlePage(filePath, res, data = {}) {
        // 3. STRUCT CHECK: If page missing, send EASE_STRUCT_INVALID (601) or 404
        if (!fs.existsSync(filePath)) {
            Codes.send(res, Codes.NOT_FOUND, "The requested .easjs file does not exist.");
            return;
        }

        try {
            const rawEasJS = fs.readFileSync(filePath, 'utf-8');
            const htmlBody = this.interpret(rawEasJS, res);
            
            if (htmlBody) {
                // If everything is fine, send standard 200 OK
                res.writeHead(Codes.OK, { 'Content-Type': 'text/html' });
                res.end(htmlBody);
            }
        } catch (e) {
            // Error handled by interpret or system error
        }
    }
};

const Runtime = {
    /**
     * The Interpreter: Turns .easjs code into standard Web code
     */
    interpret(rawCode) {
        let processedCode = rawCode;

        // 1. Run Security check on raw input
        processedCode = Security.sanitize(processedCode);

        // 2. Process Decorators (~@~Name { ... })
        const decoratorRegex = /~@~([\w]+)\s*\{([\s\S]*?)\}/g;
        processedCode = processedCode.replace(decoratorRegex, (match, name, content) => {
            return Decorators.call(name, content.trim());
        });

        // 3. Process UI Elements (addTag)
        const tagRegex = /addTag\([\s\S]*?\)\s*\{[\s\S]*?\};/g;
        processedCode = processedCode.replace(tagRegex, (match) => {
            return UIadding.parseTag(match);
        });

        // 4. Process Styling (applyStyle)
        const styleRegex = /applyStyle\([\s\S]*?\)\s*\{[\s\S]*?\};/g;
        processedCode = processedCode.replace(styleRegex, (match) => {
            const css = Styling.parseStyle(match);
            return `<style>${css}</style>`;
        });

        // 5. Process Images (addImage)
        const imgRegex = /addImage\([\s\S]*?\)\s*\{[\s\S]*?\};/g;
        processedCode = processedCode.replace(imgRegex, (match) => {
            return IMGRendering.parseImage(match);
        });

        return processedCode;
    },

    /**
     * The Page Router: Handles Routes/Pages
     */
    handlePage(filePath, res, data = {}) {
        if (!fs.existsSync(filePath)) {
            res.writeHead(404);
            res.end("404: Page Not Found in Routes/Pages");
            return;
        }

        const rawEasJS = fs.readFileSync(filePath, 'utf-8');
        
        // Convert Ease.js logic to HTML
        const htmlBody = this.interpret(rawEasJS);
        
        // Inject dynamic data if needed
        const finalHTML = DynamicHTML.generate(htmlBody, data);
        
        // Send to browser with professional headers
        DynamicHTML.send(res, finalHTML);
    },

    /**
     * The API Executor: Handles Routes/APIs and Work/
     */
    executeAPI(filePath, req, res) {
        // SECURITY: Authentication check before execution
        if (!Security.validateAPICall(req.headers)) {
            res.writeHead(401);
            res.end("Unauthorized Ease.js API Call");
            return;
        }

        try {
            // Because Ease.js accepts valid Node.js, we can 'require' the API file
            const apiLogic = require(filePath);
            apiLogic(req, res); // Execute the developer's function
        } catch (error) {
            console.error("Ease.js Runtime Error:", error);
            res.writeHead(500);
            res.end("Internal Server Error in API execution");
        }
    }
};

module.exports = Runtime;
