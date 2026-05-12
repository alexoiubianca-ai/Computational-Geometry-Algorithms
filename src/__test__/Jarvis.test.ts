import {Point, JarvisUppperHull, JarvisLowerHull, reuniune} from "../Jarvis";

const puncteTest: Point[] = [
    { nume: "P1", x: 5, y: 7 },
    { nume: "P2", x: 20, y: 12 },
    { nume: "P3", x: 1, y: 2 },
    { nume: "P4", x: 15, y: 9 },
    { nume: "P5", x: 10, y: 10 },
    { nume: "P6", x: 3, y: 4 },
    { nume: "P7", x: 14, y: 13 },
    { nume: "P8", x: 4, y: 14 },
    { nume: "P9", x: 12, y: 6 },
    { nume: "P10", x: 8, y: 15 },
    { nume: "P11", x: 19, y: 3 },
    { nume: "P12", x: 9, y: 1 },
    { nume: "P13", x: 18, y: 8 }
];

const upperHullPoints = JarvisUppperHull(puncteTest);
const lowerHullPoints = JarvisLowerHull(puncteTest);
const rezultatAsteptat = reuniune(upperHullPoints, lowerHullPoints);

describe("Jarvis's Algorithm Tests", () => {
    test("Lantul superior", () => {
        const UpperHullNamesAsteptate = ["P3", "P8", "P10", "P2"];
        const upperHullNames = upperHullPoints.map(p => p.nume);
        expect(upperHullNames).toEqual(UpperHullNamesAsteptate);
    });
    test("Lantul inferior", () => {
        const LowerHullNamesAsteptate = ["P3", "P12", "P11", "P2"];
        const lowerHullNames = lowerHullPoints.map(p => p.nume);
        expect(lowerHullNames).toEqual(LowerHullNamesAsteptate);
    });
    test("Acoperirea convexa", () => {
        const convexHullNames = ["P3", "P8", "P10", "P2", "P11", "P12"];
        const output = rezultatAsteptat.map(p => `${p.nume}`);
        expect(convexHullNames).toEqual(output);
    });
});