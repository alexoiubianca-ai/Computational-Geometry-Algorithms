import {Point, afiseazaRezultate, translatare, calculeazaCentruGreutate, sortarePuncte, localizarePunct} from "../LPC";

const poligon: Point[] = [
    {x: 0, y: 5, nume: "P1"},
    {x: 9, y: 0, nume: "P2"},
    {x: -3, y: 4, nume: "P3"},
    {x: 5, y: -5, nume: "P4"},
    {x: 8, y: 2, nume: "P5"},
    {x: 1, y: -6, nume: "P6"},
    {x: 7, y: -3, nume: "P7"},
    {x: 4, y: 4, nume: "P8"},
    {x: -4, y: -5, nume: "P9"},
    {x: -5, y: 1, nume: "P10"},
    {x: -2, y: 5, nume: "P11"}
]

const G = calculeazaCentruGreutate(poligon[0], poligon[1], poligon[2]);
const PoligonTranslatat = translatare(poligon, G);
const PoligonSortat = sortarePuncte(PoligonTranslatat);

const puncteTest: Point[] = [
  { x: 2, y: 3 , nume: "M1"},
  { x: -5, y: 1, nume: "M2" },
  { x: 7, y: -3, nume: "M3"},
  { x: 6, y: 3, nume: "M4" },
  { x: 2, y: 0, nume: "M5" },
  { x: 4, y: 2, nume: "M6" },
  { x: 7, y: 5, nume: "M7" },
  { x: 7, y: 4, nume: "M8" },
  { x: -2, y: 6, nume: "M9" },
  { x: -3, y: 5, nume: "M10" },
  { x: -6, y: 3 , nume: "M11"},
  { x: -2, y: 1, nume: "M12" },
  { x: -2, y: -6, nume: "M13"},
  { x: -1, y: -5, nume: "M14" },
  { x: -2, y: -7, nume: "M15" },
  { x: 2, y: -4, nume: "M16" },
  { x: 3, y: -7, nume: "M17" },
  { x: 5, y: -2, nume: "M18" },
  { x: 7, y: -2, nume: "M19" }
];

describe("Afișare tabel rezultate", () => {
    console.log("Centru de greutate este: ", G);
    console.log("Poligonul este: ", poligon);
    console.log("Poligonul translatat este: ", PoligonTranslatat);
    console.log("Poligonul sortat este: ", PoligonSortat);
    test("Tabel cu analiză puncte", () => {
        console.log("\n=== Tabel rezultate Localizare Puncte ===\n");
        afiseazaRezultate(PoligonSortat, puncteTest);
    });
    test.each([
    ["M1", "INTERIOR"],
    ["M2", "PE LATURA"], 
    ["M3", "PE LATURA"], 
    ["M4", "PE LATURA"], 
    ["M5", "INTERIOR"], 
    ["M6", "INTERIOR"], 
    ["M7", "EXTERIOR"], 
    ["M8", "EXTERIOR"], 
    ["M9", "EXTERIOR"], 
    ["M10", "EXTERIOR"],
    ["M11", "EXTERIOR"],
    ["M12", "INTERIOR"], 
    ["M13", "EXTERIOR"], 
    ["M14", "INTERIOR"], 
    ["M15", "EXTERIOR"], 
    ["M16", "INTERIOR"], 
    ["M17", "EXTERIOR"], 
    ["M18", "INTERIOR"], 
    ["M19", "INTERIOR"]  
  ])("Punctul %s ar trebui să fie %s", (numePunct, statusAsteptat) => {
    
    const punct = puncteTest.find(p => p.nume === numePunct);
        expect(punct).toBeDefined();

    if (punct) {
            const rezultat = localizarePunct(PoligonSortat, G, punct);
            expect(rezultat).toBe(statusAsteptat);
        }
    });
});