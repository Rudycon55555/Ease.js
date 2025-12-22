// EaseJsInstaller.js - The Official Ease.js Setup Tool
const https = require('https');
const fs = require('fs');
const path = require('path');

const REPO_BASE = "https://raw.githubusercontent.com/Rudycon55555/Ease.js/main/Code";

// List of all the files we built together
const filesToDownload = [
    { folder: 'Frontend', name: 'UIadding.js' },
    { folder: 'Frontend', name: 'Styling.js' },
    { folder: 'Frontend', name: 'IMG_Rendering-Scripting.js' },
    { folder: 'Middlend', name: 'NeededStruct.js' },
    { folder: 'Middlend', name: 'Security.js' },
    { folder: 'Middlend', name: 'WebMasterServer.js' },
    { folder: 'Middlend', name: 'Identity.js' },
    { folder: 'Middlend', name: 'Cryptography.js' },
    { folder: 'Middlend', name: 'Decorators.js' },
    { folder: 'Middlend', name: 'Runtime.js' },
    { folder: 'Backend',  name: 'DataHandler.js' },
    { folder: 'Backend',  name: 'EasyMath.js' },
    { folder: 'Backend',  name: 'DynamicHTMLGen.js' }
    { folder: 'Middlend', name: 'CustomHTTPcodes.js' },
];

async function install() {
    console.log("🛠️ Starting Ease.js Installation...");

    for (const file of filesToDownload) {
        const folderPath = path.join(process.cwd(), file.folder);
        
        // 1. Create the folder if it doesn't exist
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        const fileUrl = `${REPO_BASE}/${file.folder}/${file.name}`;
        const filePath = path.join(folderPath, file.name);

        console.log(`📥 Downloading: ${file.folder}/${file.name}...`);

        // 2. Fetch the file from your GitHub
        https.get(fileUrl, (res) => {
            if (res.statusCode !== 200) {
                console.error(`❌ Failed to download ${file.name} (Status: ${res.statusCode})`);
                return;
            }

            const fileStream = fs.createWriteStream(filePath);
            res.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
            });
        }).on('error', (err) => {
            console.error(`❌ Error downloading ${file.name}: ${err.message}`);
        });
    }

    // 3. Create the Describe/ and Work/ folders for the user
    fs.mkdirSync(path.join(process.cwd(), 'Describe'), { recursive: true });
    fs.mkdirSync(path.join(process.cwd(), 'Work'), { recursive: true });
    fs.mkdirSync(path.join(process.cwd(), 'Routes', 'Pages'), { recursive: true });
    fs.mkdirSync(path.join(process.cwd(), 'Routes', 'APIs'), { recursive: true });

    console.log(`
✅ Ease.js Installed Successfully!
Next steps for the developer:
1. Create Describe/Router.txt
2. Create Routes/Pages/Index.easjs
3. Run your app with node Runtime.js
    `);
}

install();
