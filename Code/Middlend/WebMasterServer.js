// WebMasterServer.js - The Ease.js Core Server
const http = require('http');
const Security = require('./Security');
const NeededStruct = require('./NeededStruct');

const WebMasterServer = {
    start(config = { port: 3000, name: "Ease.js App" }) {
        // 1. Run the Structure check before starting
        if (!NeededStruct.checkStructure(process.cwd())) {
            console.error("❌ Server failed to start: Project structure is invalid.");
            return;
        }

        // 2. Run Legal check
        Security.checkLegalCompliance(process.cwd());

        // 3. Create the Server
        const server = http.createServer((req, res) => {
            // SECURITY: Check for suspicious URL characters ($ or ../)
            if (!Security.isUrlSafe(req.url)) {
                res.writeHead(403, { 'Content-Type': 'text/plain' });
                res.end("403 Forbidden: Suspicious activity detected.");
                return;
            }

            // API PROTECTION: If it's an API route, check headers BEFORE constructing
            if (req.url.startsWith('/api')) {
                if (!Security.validateAPICall(req.headers)) {
                    res.writeHead(401, { 'Content-Type': 'text/plain' });
                    res.end("401 Unauthorized: API Key Missing or Invalid.");
                    return;
                }
            }

            // SUCCESS: For now, just a heartbeat response
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(`<h1>${config.name} is running!</h1>`);
            res.write(`<p>Path accessed: ${Security.sanitize(req.url)}</p>`);
            res.end();
        });

        // 4. Listen on the chosen port
        server.listen(config.port, () => {
            console.log(`
🚀 ${config.name} is LIVE!
----------------------------------
Port:    ${config.port}
Status:  Professional & Secure
----------------------------------
            `);
        });
    }
};

module.exports = WebMasterServer;
