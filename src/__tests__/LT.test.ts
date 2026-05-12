import { Point, determinant, semneMuchii, afiseazaTabel } from "../LT";

const A: Point = { x: -4, y: 1 };
const B: Point = { x: -7, y: -3 };
const C: Point = { x: -2, y: -4 };

const puncteTest: Point[] = [
  { x: -4.5, y: -3.5 , nume: "A1"},
  { x: -2.8, y: -2, nume: "A2" },
  { x: -5.5, y: -1, nume: "A3"},
  { x: -3, y: -3, nume: "A4" },
  { x: -3.9, y: -3, nume: "A5" },
  { x: -4.4, y: -3.2, nume: "A6" },
  { x: -5.1, y: -3.1, nume: "A7" },
  { x: -4.2, y: -1.5, nume: "A8" },
  { x: -3.8, y: -1.9, nume: "A9" },
  { x: -4.9, y: 2.5, nume: "B1" },
  { x: -3.9, y: -1.2, nume: "B2" },
  { x: -3.1, y: -3.2, nume: "B3" },
  { x: -4.1, y: -2.3, nume: "B4" },
  { x: -4.6, y: 2.6, nume: "B5" },
  { x: -4.9, y: -3.3, nume: "B6" },
  { x: -3.7, y: -2.8, nume: "B7" },
  { x: -4.3, y: -3.4, nume: "B8" },
  { x: -4.5, y: -1, nume: "B9" },
  { x: -4.2, y: -2, nume: "C1" },
  { x: -3.7, y: -2.5, nume: "C2" },
  { x: -4.8, y: -2.8, nume: "C3" },
  { x: -2, y: -0, nume: "C4"},
  { x: -1, y: -5, nume: "C5" },
  { x: -6, y: -4, nume: "C6" },
  { x: -8, y: -3, nume: "C7" },
  { x: -7, y: 0, nume: "C8" },
  { x: -1, y: -7, nume: "C9" },
  { x: -6, y: 5, nume: "D1" },
  { x: -9, y: -1, nume: "D2" },
  { x: 1, y: -3, nume: "D3" },
  { x: -8, y: -2, nume: "D4" },
  { x: -3, y: 4, nume: "D5" },
  { x: -11, y: -4, nume: "D6" },
  { x: -5, y: -8, nume: "D7" },
  { x: 0, y: 1, nume: "D8" },
  { x: -2, y: 2, nume: "D9" },
  { x: -7, y: 3, nume: "E1" },
  { x: -12, y: 0, nume: "E2" },
  { x: -3, y: -9, nume: "E3" },
  { x: -1, y: -1, nume: "E4" },
  { x: -4.3, y: -1.8, nume: "E5" },
  { x: -4.7, y: -2.2, nume: "E6" },
  { x: -5.0, y: -2.5, nume: "E7" },
];

describe("Afișare tabel semne + / - / 0", () => {
  test("Tabel semne muchii", () => {
    afiseazaTabel(A, B, C, puncteTest);
  });
});
