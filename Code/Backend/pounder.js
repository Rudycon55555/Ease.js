// pounding.js - The Pounding Library
const Pounding = {
    /**
     * Generates a CryptyPound result
     * Formula: ((P + s)^p - u) % i
     */
    cryptyPound: function(input, s, u, p, i) {
        // Use BigInt for large power calculations to avoid precision errors
        let P = BigInt(input);
        let salt = BigInt(s);
        let sugar = BigInt(u);
        let pounding = BigInt(p);
        let iv = BigInt(i);

        let result = ((P + salt) ** pounding - sugar) % iv;
        // Ensure result is positive
        return (result < 0n) ? (result + iv).toString() : result.toString();
    },

    verify: function(attempt, s, u, p, i, storedPound) {
        return this.cryptyPound(attempt, s, u, p, i) === storedPound.toString();
    }
};

// Export for use in other files
if (typeof module !== 'undefined') module.exports = Pounding;
