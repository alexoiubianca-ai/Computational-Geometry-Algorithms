export type Point = { x: number; y: number; nume?: string };

export function delta(M: Point, A: Point, B: Point): number {
    return (A.x - M.x) * (B.y - M.y) - (A.y - M.y) * (B.x - M.x);
}

export function calculeazaCentruGreutate(P1: Point, P2: Point, P3: Point): Point {
    const Gx = (P1.x + P2.x + P3.x) / 3;
    const Gy = (P1.y + P2.y + P3.y) / 3;
    return { x: Gx, y: Gy };
}

export function translatare(P: Point[], G: Point): Point[] {
  return P.map(P => ({
    x: P.x - G.x,
    y: P.y - G.y,
    nume: P.nume
  }));
}

function cadran(P: Point): number {

  if (P.x > 0 && P.y >= 0) return 1;
  if (P.x <= 0 && P.y > 0) return 2;
  if (P.x < 0 && P.y <= 0) return 3;
  if (P.x >= 0 && P.y < 0) return 4;
}

function comparaPuncte(A: Point, B: Point): number {
    const cA = cadran(A);
    const cB = cadran(B);

    if (cA !== cB) {
        return cA - cB;
    }
    
    const O = { x: 0, y: 0 };
    const d = delta(A, O, B);
    if (d > 0) return 1;
    if (d < 0) return -1;
    return 0;
}

export function sortarePuncte(P: Point[]): Point[] {
  const PuncteSortate = [...P];

  PuncteSortate.sort((A, B) => comparaPuncte(A, B));
    
  return PuncteSortate;
}

export function localizarePunct(P: Point[],G:Point, M: Point): string {

  [M]=translatare([M], G);
  if (M.x === 0 && M.y === 0) {
    return "INTERIOR"; 
  }

  const n = P.length;
  const inainteDePrimul = comparaPuncte(M, P[0]) < 0;
  const dupaUltimul     = comparaPuncte(M, P[n - 1]) > 0;

  let pStart: Point;
  let pEnd: Point;

  if (inainteDePrimul || dupaUltimul) {
    // Sectorul care închide poligonul
    pStart = P[n - 1];
    pEnd = P[0];
  } else {
    let left = 0;
    let right = n - 1;

    while (right - left > 1) {
      const mid = Math.floor((left + right) / 2);
      
      if (comparaPuncte(M, P[mid]) > 0) {
        left = mid;
      } else {
        right = mid;
      }
    }

    pStart = P[left];
    pEnd = P[right];
  }

  const detLatura = (pEnd.x - pStart.x) * (M.y - pStart.y) - 
                    (pEnd.y - pStart.y) * (M.x - pStart.x);

  if (detLatura > 0) return "INTERIOR";
  if (detLatura < 0) return "EXTERIOR";
  return "PE LATURA";
}

export function afiseazaRezultate(P: Point[], M: Point[]): void {
  const G = calculeazaCentruGreutate(P[0], P[1], P[2]);

  const Ptranslatat = translatare(P, G);

  const PSortat = sortarePuncte(Ptranslatat);

  const dateTabel = M.map(M => {
    const Mprim = { 
        x: M.x - G.x, 
        y: M.y - G.y,
        nume: M.nume
    };

    const rezultat = localizarePunct(PSortat, G, Mprim);

    return {
      "Punct": M.nume,
      "X": M.x,
      "Y": M.y,
      "Stare": rezultat
    };
  });

  console.table(dateTabel);
}