export type Point = { x: number; y: number; nume?: string };

function delta(M: Point, A: Point, B: Point): number {
    return (A.x - M.x) * (B.y - M.y) - (A.y - M.y) * (B.x - M.x);
}

function sortarePuncte(P: Point[]): Point[] {
    const PuncteSortate = [...P];
    PuncteSortate.sort((A, B) => A.x - B.x);
    return PuncteSortate;
}

export function JarvisUppperHull(P: Point[]): Point[] {
    const B = sortarePuncte(P);
    const n = B.length;

    if (n < 3) return B;

    const upperHull: Point[] = [];
    let M1 = B[0];
    upperHull.push(M1);
    let indexCurent = 0;

    while (M1.nume !== B[n - 1].nume) {
        let M2 = B[indexCurent + 1];

        for (let i = indexCurent + 1; i < n; i++) {
        const d = delta(M1, M2, B[i]);
        
        if (d > 0) {
            M2 = B[i];
        } else if (d === 0 && B[i].x < M2.x) {
            M2 = B[i];
        }
    }
    upperHull.push(M2);
    M1 = M2;
    indexCurent = B.findIndex(p => p.nume === M1.nume);
    }

    return upperHull;
}

export function JarvisLowerHull(P: Point[]): Point[] {
    const B = sortarePuncte(P);
    const n = B.length;

    if (n < 3) return B;

    const lowerHull: Point[] = [];
    let N1 = B[0];
    lowerHull.push(N1);
    let indexCurent = 0;
    
    while (N1 !== B[n - 1]) {
        let N2 = B[indexCurent + 1];

        for (let i = indexCurent + 1; i < n; i++) {
        const d = delta(N1, N2, B[i]);
        
        if (d < 0) {
            N2 = B[i];
        } else if (d === 0 && B[i].x < N2.x) {
            N2 = B[i];
        }
    }
    lowerHull.push(N2);
    N1 = N2;
    indexCurent = B.findIndex(p => p.nume === N1.nume);

    }
    return lowerHull;
}

export function reuniune(upperHull: Point[], lowerHull: Point[]): Point[] {
    const rezultat = [...upperHull];

    for (let i = lowerHull.length - 2; i > 0; i--) {
        rezultat.push(lowerHull[i]);
    }

    return rezultat;
}