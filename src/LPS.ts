export type Point = { x: number; y: number; nume?: string };

function delta(M: Point, A: Point, B: Point): number {
    return (A.x - M.x) * (B.y - M.y) - (A.y - M.y) * (B.x - M.x);
}

export function localizeazaPunct(P: Point[], M: Point): number {
    const n = P.length;
    const Pext = [...P, P[0]];
    let c = 0;

    for (let i = 0; i < n; i++) {
        // Datorită Pext, când i ajunge la n-1, Pi1 va fi Pext[n], care este de fapt P[0]. 
        // Astfel, ultima latură închide corect poligonul.
        const Pi = Pext[i];
        const Pi1 = Pext[i + 1];

        // Muchia este orizontala
        if (Pi.y === Pi1.y) {
            if (M.y === Pi.y && (M.x - Pi.x) * (M.x - Pi1.x) <= 0) {
                return 0;
            }
        } else {
                // Muchia este oblica (daca este verticala se considera tot oblica)
                let A: Point, B: Point;
                if (Pi.y < Pi1.y) {
                    A = Pi;
                    B = Pi1;
                } 
                else {
                    A = Pi1;
                    B = Pi;
                }
                if (((M.y - A.y) * (M.y - B.y) <= 0) && (delta(M, A, B) === 0)){
                    return 0;
                }
                if (M.y >= A.y && M.y < B.y && delta(M, A, B) > 0) {
                    c++;
                }
        }
    }
    if (c % 2 === 0) {
        return 1;
    } else {
        return -1;
    }
}

export function afiseazaRezultate(poligon: Point[], puncteTest: Point[]): void {
    const rezultate = puncteTest.map((pt) => {
        const status = localizeazaPunct(poligon, pt);
        return {
            "Nume": pt.nume || "M?",
            "X": pt.x,
            "Y": pt.y,
            "Rezultat Localizare": status
        };
    });
    console.table(rezultate);
}
