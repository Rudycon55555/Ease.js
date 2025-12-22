// Styling.js - The Style Engine for Ease.js

const Styling = {
    parseStyle(styleBlock) {
        try {
            // 1. Get the target (the element or ID)
            const targetMatch = styleBlock.match(/applyStyle\(\[(.*?)\]\)/);
            let target = targetMatch ? targetMatch[1].trim() : "div";

            // If the developer put an ID (id = "val"), convert it to #val for CSS
            if (target.includes("=")) {
                target = "#" + target.split("=")[1].replace(/"/g, "").trim();
            }

            // 2. Extract all type, value, and math groups
            // We look for everything between the curly braces { ... }
            const bodyMatch = styleBlock.match(/\{([\s\S]*)\}/);
            if (!bodyMatch) return "";

            const body = bodyMatch[1];
            let cssRules = "";

            // Split by "type:" to get each style property group
            const groups = body.split("type:").slice(1);

            groups.forEach(group => {
                const type = group.match(/\[(.*?)\]/)[1].trim();
                const valueMatch = group.match(/value:\s*\[(.*?)\]/);
                const mathMatch = group.match(/math:\s*\[(.*?)\]/);

                let finalValue = valueMatch ? valueMatch[1].trim() : "";
                let mathLogic = mathMatch ? mathMatch[1].trim() : "";

                // 3. Handle Math logic
                // If math is provided, we use eval() to calculate it.
                // Note: In a real app, eval is risky, but for your own engine, it's a powerful start!
                if (mathLogic && mathLogic !== "") {
                    try {
                        finalValue = eval(mathLogic);
                    } catch (e) {
                        console.error("Ease.js Math Error: " + e.message);
                    }
                }

                cssRules += `  ${type}: ${finalValue};\n`;
            });

            return `${target} {\n${cssRules}}`;

        } catch (error) {
            return `/* Ease.js Style Error: Check your applyStyle syntax */`;
        }
    }
};

module.exports = Styling;
