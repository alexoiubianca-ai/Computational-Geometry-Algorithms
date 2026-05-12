import {Point, localizeazaPunct, afiseazaRezultate} from "../LPS";

const poligon: Point[] = [
    {x: 10, y: 4, nume: "P1"},
    {x: 11, y: 6, nume: "P2"},
    {x: 12, y: 2, nume: "P3"},
    {x: 13, y: 9, nume: "P4"},
    {x: 14, y: 6, nume: "P5"},
    {x: 16, y: 8, nume: "P6"},
    {x: 20, y: 4, nume: "P7"},
    {x: 16, y: 14, nume: "P8"},
    {x: 4, y: 14, nume: "P9"},
    {x: 1, y: 2, nume: "P10"},
    {x: 6, y: 6, nume: "P11"},
    {x: 8, y: 6, nume: "P12"}
]

const puncteTest: Point[] = [
  { x: 4, y: 6 , nume: "M1"},
  { x: 9, y: 6, nume: "M2" },
  { x: 13, y: 6, nume: "M3"},
  { x: 7, y: 6, nume: "M4" },
  { x: 14, y: 6, nume: "M5" },
  { x: 15, y: 6, nume: "M6" },
  { x: 12, y: 6, nume: "M7" },
  { x: 12, y: 8, nume: "M8" },
  { x: 15, y: 8, nume: "M9" },
  { x: 17, y: 6, nume: "M10" }
];

describe("Afișare tabel rezultate", () => {
  test("Tabel cu analiză puncte", () => {
    console.log("\n=== Tabel rezultate Localizare Puncte ===\n");
    afiseazaRezultate(poligon, puncteTest);
  });

  test.each([
    ["M1", -1],
    ["M2", -1], 
    ["M3", 1], 
    ["M4", 0], 
    ["M5", 0], 
    ["M6", 1], 
    ["M7", -1], 
    ["M8", -1], 
    ["M9", -1], 
    ["M10", 1]  
  ])("Punctul %s ar trebui să fie %s", (numePunct, statusAsteptat) => {
    
    const punct = puncteTest.find(p => p.nume === numePunct);
    expect(punct).toBeDefined();

    if (punct) {
      // Aici apelăm funcția care returnează string-ul de stare
      const rezultat = localizeazaPunct(poligon, punct); 
      expect(rezultat).toBe(statusAsteptat);
    }
  });
});
