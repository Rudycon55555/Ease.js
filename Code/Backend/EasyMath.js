// EasyMath.js - The Universal Mathematical Engine

const EasyMath = {
    // 1. ARITHMETIC (Basic Operations)
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    mul: (a, b) => a * b,
    div: (a, b) => (b === 0 ? "ZeroDivisionError" : a / b),

    // 2. ALGEBRA (Solving for Unknowns)
    // Linear: ax + b = 0
    solveLinear: (a, b) => -b / a,
    // Quadratic: ax^2 + bx + c = 0
    solveQuadratic(a, b, c) {
        let d = (b * b) - (4 * a * c);
        return d < 0 ? [] : [(-b + Math.sqrt(d)) / (2 * a), (-b - Math.sqrt(d)) / (2 * a)];
    },

    // 3. GEOMETRY (Shapes & Space)
    areaCircle: (r) => Math.PI * Math.pow(r, 2),
    pythagoras: (a, b) => Math.sqrt(a * a + b * b),

    // 4. TRIGONOMETRY (Angles & Triangles)
    sin: (deg) => Math.sin(deg * (Math.PI / 180)),
    cos: (deg) => Math.cos(deg * (Math.PI / 180)),
    tan: (deg) => Math.tan(deg * (Math.PI / 180)),

    // 5. CALCULUS (Change & Accumulation)
    derivative: (f, x, h = 0.0001) => (f(x + h) - f(x)) / h,
    integral: (f, a, b, steps = 1000) => {
        let area = 0;
        let dx = (b - a) / steps;
        for (let i = 0; i < steps; i++) area += f(a + i * dx) * dx;
        return area;
    },

    // 6. NUMBER THEORY (Integers & Primes)
    isPrime: (n) => {
        for (let i = 2, s = Math.sqrt(n); i <= s; i++) if (n % i === 0) return false;
        return n > 1;
    },
    gcd: (a, b) => (b === 0 ? a : EasyMath.gcd(b, a % b)), // Greatest Common Divisor

    // 7. SET THEORY (Collections)
    union: (s1, s2) => [...new Set([...s1, ...s2])],
    intersection: (s1, s2) => s1.filter(x => s2.includes(x)),

    // 8. MATHEMATICAL LOGIC (Boolean Reasoning)
    AND: (a, b) => a && b,
    OR: (a, b) => a || b,
    XOR: (a, b) => (a || b) && !(a && b),

    // 9. LINEAR ALGEBRA (Matrices & Vectors)
    // Adds two 2D vectors [x, y]
    addVector: (v1, v2) => [v1[0] + v2[0], v1[1] + v2[1]],
    // Determinant of a 2x2 matrix [[a,b],[c,d]]
    det2x2: (m) => m[0][0] * m[1][1] - m[0][1] * m[1][0],

    // 10. TOPOLOGY & ABSTRACT ALGEBRA (Foundational Helpers)
    // Returns the "Euler Characteristic" for simple polyhedra
    eulerChar: (V, E, F) => V - E + F,
    // Checks if a set is closed under an operation (Example for Abstract Algebra)
    isClosed: (elements, operation) => {
        return elements.every(a => elements.every(b => elements.includes(operation(a, b))));
    }
};

module.exports = EasyMath;
