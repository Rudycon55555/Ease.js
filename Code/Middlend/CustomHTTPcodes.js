// CustomHTTPcodes.js - Ease.js Status Engine

const CustomHTTPcodes = {
    // --- STANDARD CODES ---
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,

    // --- CUSTOM EASE.JS CODES (Version 2.0.0) ---
    // 600: Security Shield blocked a dangerous character ($ or ../)
    EASE_SECURITY_SHIELD: 600,
    
    // 601: The project structure (NeededStruct) is missing a folder
    EASE_STRUCT_INVALID: 601,
    
    // 602: A Decorator (~@~) was called but not defined
    EASE_DECORATOR_MISSING: 602,
    
    // 603: Legal.txt is missing or too short
    EASE_NON_COMPLIANT: 603,

    // Helper function to send the response
    send(res, code, message) {
        res.writeHead(code, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: code,
            message: message,
            framework: "Ease.js v2.0.0"
        }));
    }
};

module.exports = CustomHTTPcodes;
