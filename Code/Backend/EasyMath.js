// EasyMath.js - The Universal Mathematical Engine (Upgraded to nD)

const EasyMath = {
    // 1. ARITHMETIC (0D - Scalar Operations)
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    mul: (a, b) => a * b,
    div: (a, b) => (b === 0 ? "ZeroDivisionError" : a / b),
    mod: (a, b) => a % b,

    // 2. ALGEBRA (1D - Solving for Unknowns)
    solveLinear: (a, b) => -b / a,
    solveQuadratic(a, b, c) {
        let d = (b * b) - (4 * a * c);
        if (d < 0) return [];
        if (d === 0) return [-b / (2 * a)];
        return [(-b + Math.sqrt(d)) / (2 * a), (-b - Math.sqrt(d)) / (2 * a)];
    },

    // 3. GEOMETRY (2D/3D/nD - Shapes & Space)
    areaCircle: (r) => Math.PI * Math.pow(r, 2),
    volumeSphere: (r) => (4 / 3) * Math.PI * Math.pow(r, 3),
    // n-Dimensional Euclidean Distance (Pythagoras generalized)
    dist: (p1, p2) => Math.sqrt(p1.reduce((sum, val, i) => sum + Math.pow(val - p2[i], 2), 0)),

    // 4. TRIGONOMETRY (Angles & Rotations)
    sin: (deg) => Math.sin(deg * (Math.PI / 180)),
    cos: (deg) => Math.cos(deg * (Math.PI / 180)),
    tan: (deg) => Math.tan(deg * (Math.PI / 180)),
    radToDeg: (rad) => rad * (180 / Math.PI),

    // 5. CALCULUS (Infinitesimal Change)
    derivative: (f, x, h = 0.0001) => (f(x + h) - f(x)) / h,
    integral: (f, a, b, steps = 1000) => {
        let area = 0;
        let dx = (b - a) / steps;
        for (let i = 0; i < steps; i++) area += f(a + i * dx) * dx;
        return area;
    },

    // 6. NUMBER THEORY (Discrete Properties)
    isPrime: (n) => {
        if (n < 2) return false;
        for (let i = 2, s = Math.sqrt(n); i <= s; i++) if (n % i === 0) return false;
        return true;
    },
    gcd: (a, b) => (b === 0 ? Math.abs(a) : EasyMath.gcd(b, a % b)),
    factorial: (n) => (n <= 1 ? 1 : n * EasyMath.factorial(n - 1)),

    // 7. SET THEORY (Collections)
    union: (s1, s2) => [...new Set([...s1, ...s2])],
    intersection: (s1, s2) => s1.filter(x => s2.includes(x)),
    cartesianProduct: (a, b) => a.flatMap(d => b.map(e => [d, e])),

    // 8. MATHEMATICAL LOGIC
    AND: (a, b) => !!(a && b),
    OR: (a, b) => !!(a || b),
    XOR: (a, b) => !!((a || b) && !(a && b)),
    NOT: (a) => !a,

    // 9. LINEAR ALGEBRA (nD - Vectors & Matrices)
    // Supports any dimension: [x, y, z, ...]
    addVectors: (v1, v2) => v1.map((val, i) => val + v2[i]),
    dotProduct: (v1, v2) => v1.reduce((sum, val, i) => sum + val * v2[i], 0),
    
    // Recursive Determinant for n x n Matrix
    det: (m) => {
        if (m.length === 1) return m[0][0];
        if (m.length === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
        return m[0].reduce((acc, val, i) => {
            const minor = m.slice(1).map(row => row.filter((_, j) => i !== j));
            return acc + (i % 2 === 0 ? 1 : -1) * val * EasyMath.det(minor);
        }, 0);
    },

    // 10. TOPOLOGY & HIGHER DIMENSIONS
    // Euler Characteristic: V - E + F - ... = Chi
    eulerChar: (elements) => elements.reduce((acc, val, i) => (i % 2 === 0 ? acc + val : acc - val), 0),
    
    // Hyper-volume of an n-ball (Generalized Sphere)
    nBallVolume: (n, r) => {
        const numerator = Math.pow(Math.PI, n / 2);
        const gamma = (n) => (n === 1 ? 1 : n === 0.5 ? Math.sqrt(Math.PI) : (n - 1) * gamma(n - 1));
        // Simple approximation using Gamma function logic
        const denominator = (n / 2 === Math.floor(n / 2)) ? EasyMath.factorial(n / 2) : "ComplexGammaRequired";
        return denominator === "ComplexGammaRequired" ? "Use Integer N" : (numerator / denominator) * Math.pow(r, n);
    },

    isClosed: (elements, operation) => {
        return elements.every(a => elements.every(b => elements.includes(operation(a, b))));
    }
};

module.exports = EasyMath;
