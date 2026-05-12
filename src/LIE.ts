export type Point = { x: number; y: number; nume?: string };

function lowerBoundX(P: Point[], M: Point): number {
    let st = 0, dr = P.length;
    while (st < dr) {
        const mij = Math.floor((st + dr) / 2);
        if (P[mij].x < M.x) { 
            st = mij + 1;
        } else {
            dr = mij;
        }
    }
    return st;
}

function upperBoundY(P: Point[], M: Point): number {
    let st = 0, dr = P.length;
    while (st < dr) {
        const mij = Math.floor((st + dr) / 2);
        if (P[mij].y <= M.y) { 
            st = mij + 1;
        } else {
            dr = mij;
        }
    }
    return st;
}

function sortarePuncteX(P: Point[]): Point[] {
    return [...P].sort((a, b) => a.x - b.x);
}

function sortarePuncteY(P: Point[]): Point[] {
    return [...P].sort((a, b) => a.y - b.y);
} 

export type DatePreprocesate = {
    T: number[][];
    lxSort: Point[];
    lySort: Point[];
};

export function initializareMatrice(P: Point[]): DatePreprocesate {
    const lxSort = sortarePuncteX(P);
    const lySort = sortarePuncteY(P); 
    const n = P.length;

    const T: number[][] = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

    for (let j = 1; j <= n; j++) {
        const punctCurent = lxSort[j - 1]; 
        const rangY = upperBoundY(lySort, punctCurent);

        for (let i = 0; i <= n; i++) {
            const valAnterioara = T[j - 1][i];

            if (i >= rangY) {
                T[j][i] = valAnterioara + 1;
            } else {
                T[j][i] = valAnterioara;
            }
        }
    }

    return { T, lxSort, lySort };
}

export function Dreptunghi(
    xMin: number, yMin: number, xMax: number, yMax: number, 
    datePreprocesate: DatePreprocesate,
): number {

    const { T, lxSort, lySort } = datePreprocesate;
    const idxLeft = lowerBoundX(lxSort, { x: xMin, y: 0 });
    const idxRight = lowerBoundX(lxSort, { x: xMax, y: 0 });
    const idxBottom = upperBoundY(lySort, { x: 0, y: yMin });
    const idxTop = upperBoundY(lySort, { x: 0, y: yMax });

    const qB = T[idxRight][idxTop];
    const qA = T[idxLeft][idxTop];
    const qC = T[idxRight][idxBottom];
    const qD = T[idxLeft][idxBottom];

    return qB - qA - qC + qD;
}