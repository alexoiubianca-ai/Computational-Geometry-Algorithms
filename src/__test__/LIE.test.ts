import {Point, DatePreprocesate, initializareMatrice, Dreptunghi} from '../LIE';

const puncteTest: Point[] = [
  { x: 5, y: 7 , nume: "P1"},
  { x: 20, y: 12, nume: "P2" },
  { x: 1, y: 1, nume: "P3"},
  { x: 15, y: 9, nume: "P4" },
  { x: 10, y: 10, nume: "P5" },
  { x: 3, y: 4, nume: "P6" },
  { x: 14, y: 13, nume: "P7" },
  { x: 4, y: 14, nume: "P8" },
  { x: 12, y: 6, nume: "P9" },
  { x: 19, y: 3, nume: "P11" },
  { x: 9, y: 2, nume: "P12" },
  { x: 18, y: 8, nume: "P13" }
];

const datePreprocesate = initializareMatrice(puncteTest);

const rezultat = Dreptunghi(
    7, 5, 17, 11, 
    datePreprocesate
);

describe("Testare LIE - Numărare puncte în dreptunghi", () => {
  test("Numără punctele în dreptunghiul definit", () => {
    expect(rezultat).toBe(3); 
  });
});