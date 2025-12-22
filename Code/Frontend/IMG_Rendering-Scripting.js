// IMG_Rendering-Scripting.js - The Asset Engine

const IMGRendering = {
    parseImage(codeBlock) {
        try {
            // 1. Extract the Source and Type
            // Syntax: addImage(path, type)
            const metaMatch = codeBlock.match(/addImage\(([^,]+),\s*([^)]+)\)/);
            const src = metaMatch[1].trim().replace(/"/g, '');
            const type = metaMatch[2].trim().toLowerCase();

            // 2. Extract Attributes (width, height, id, etc.)
            const idSection = codeBlock.match(/identifiers:\s*\[(.*?)\]/s);
            let attributes = "";
            let elementId = `img_${Math.floor(Math.random() * 1000)}`; // Fallback ID

            if (idSection && idSection[1]) {
                const pairs = idSection[1].split(';');
                pairs.forEach(p => {
                    if (p.includes('=')) {
                        const [key, val] = p.split('=').map(item => item.trim());
                        attributes += `${key}="${val}" `;
                        if (key === 'id') elementId = val; // Capture ID for scripting
                    }
                });
            }

            // 3. Extract the Scripting logic
            const scriptSection = codeBlock.match(/script:\s*\[([\s\S]*?)\]/s);
            let scriptHtml = "";
            if (scriptSection && scriptSection[1]) {
                const jsCode = scriptSection[1].trim();
                // We wrap the user's JS in a DOMContentLoaded listener
                scriptHtml = `
                <script>
                    document.addEventListener('DOMContentLoaded', () => {
                        const el = document.getElementById('${elementId}');
                        ${jsCode}
                    });
                </script>`;
            }

            // 4. Render HTML based on type
            let htmlOutput = "";
            if (type === 'svg') {
                // For SVG, we can use an <object> or <img>
                htmlOutput = `<object data="${src}" type="image/svg+xml" id="${elementId}" ${attributes}></object>`;
            } else {
                // For PNG, JPG, WEBP
                htmlOutput = `<img src="${src}" id="${elementId}" ${attributes} />`;
            }

            return `${htmlOutput}\n${scriptHtml}`;

        } catch (error) {
            return ``;
        }
    }
};

module.exports = IMGRendering;
