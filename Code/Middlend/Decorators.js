// Decorators.js - The Extendibility Engine for Ease.js

const Decorators = {
    // This object stores all functions defined with ~@~
    registry: {},

    /**
     * Registers a new decorator function
     * @param {string} name - The name of the decorator
     * @param {function} logic - The JS function to run
     */
    define(name, logic) {
        this.registry[name] = logic;
        console.log(`✨ Ease.js: New Decorator registered -> ~@~${name}`);
    },

    /**
     * The Invoker: This is what the Runtime calls when it sees ~@~Name { ... }
     * @param {string} name - Name of the decorator to run
     * @param {string} input - The content inside the { } (JS or JSON)
     */
    call(name, input) {
        if (!this.registry[name]) {
            throw new Error(`Ease.js Error: Decorator ~@~${name} is not defined!`);
        }

        let processedInput;
        try {
            // Try to parse as JSON first, if it fails, treat as a string/JS
            processedInput = JSON.parse(input);
        } catch (e) {
            processedInput = input;
        }

        // Run the definition logic and return the value
        return this.registry[name](processedInput);
    }
};

module.exports = Decorators;
