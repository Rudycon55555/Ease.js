// NeededStruct.js - The Structure Guard for Ease.js
const fs = require('fs');
const path = require('path');

const NeededStruct = {
    checkStructure(projectPath) {
        const requiredDirs = [
            'Describe',
            'Routes/Pages',
            'Routes/APIs',
            'Work'
        ];

        const requiredFiles = [
            'Routes/Pages/Index.easjs', // Mandated Title Case
            'Routes/Router.js',        // Main dynamic router
            'Describe/Router.txt'      // Main static router
        ];

        console.log("--- Ease.js Structure Check ---");

        // 1. Check for Directories
        for (const dir of requiredDirs) {
            const fullPath = path.join(projectPath, dir);
            if (!fs.existsSync(fullPath)) {
                console.error(`❌ Error: Missing folder -> ${dir}`);
                return false;
            }
        }

        // 2. Check for Specific Files
        for (const file of requiredFiles) {
            const fullPath = path.join(projectPath, file);
            if (!fs.existsSync(fullPath)) {
                console.error(`❌ Error: Missing required file -> ${file}`);
                return false;
            }
        }

        // 3. Verify Router.txt format (Secretly adds .easjs logic)
        const routerTxtPath = path.join(projectPath, 'Describe/Router.txt');
        const routerContent = fs.readFileSync(routerTxtPath, 'utf-8');
        const lines = routerContent.split('\n');

        for (let line of lines) {
            if (line.trim() && !line.includes('=')) {
                console.error(`❌ Error in Describe/Router.txt: Invalid format on line "${line}". Use /route = filename`);
                return false;
            }
        }

        console.log("✅ Project structure is valid!");
        return true;
    }
};

module.exports = NeededStruct;
