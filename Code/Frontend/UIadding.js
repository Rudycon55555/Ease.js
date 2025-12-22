// UIadding.js - Flexible Tag Engine

const UIadding = {
    // This function parses the custom addTag syntax
    parseTag(codeBlock) {
        try {
            // 1. Extract the Tag Name (e.g., h1, button)
            const tagNameMatch = codeBlock.match(/addTag\(([^)]+)\)/);
            const tagName = tagNameMatch ? tagNameMatch[1].trim() : "div";

            // 2. Extract Identifiers (the name="value" parts)
            const idSection = codeBlock.match(/identifiers:\s*\[(.*?)\]/s);
            let attributes = "";
            if (idSection && idSection[1]) {
                // Split by semicolon and convert "name = value" to 'name="value"'
                const pairs = idSection[1].split(';');
                attributes = pairs
                    .filter(p => p.trim() !== "")
                    .map(p => {
                        const [key, val] = p.split('=').map(item => item.trim());
                        return `${key}="${val}"`;
                    })
                    .join(' ');
            }

            // 3. Extract Content
            const contentSection = codeBlock.match(/content:\s*\[(.*?)\]/s);
            const content = contentSection ? contentSection[1].trim() : "";

            // 4. Assemble the final HTML
            return `<${tagName} ${attributes}>${content}</${tagName}>`;
        } catch (error) {
            return ``;
        }
    }
};

module.exports = UIadding;
