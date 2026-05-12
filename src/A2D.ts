export type Point = { x: number; y: number; nume?: string };

export type Dreptunghi = { alpha1: number; alpha2: number; beta1: number; beta2: number };

function sortarePuncteX(P: Point[]): Point[] {
    return [...P].sort((a, b) => a.x - b.x);
}

function sortarePuncteY(P: Point[]): Point[] {
    return [...P].sort((a, b) => a.y - b.y);
} 

type Nod2D = {
    Pk: Point;
    t: 0 | 1;
    LSON: Nod2D | null;
    RSON: Nod2D | null;
    mv: number;
}

export function arboreBinar(P: Point[], adancime: number = 0): Nod2D | null {
    if (P.length === 0) {
        return null;
    }

    const t: 0 | 1 = adancime % 2 === 0 ? 1 : 0;

    let puncteSortate: Point[];
    
    if (t === 1) {
        puncteSortate = sortarePuncteX(P);
    } else {
        puncteSortate = sortarePuncteY(P);
    }

    const mijIndex = Math.floor(puncteSortate.length / 2);
    const PunctCurent = puncteSortate[mijIndex];
    const mv = t === 1 ? PunctCurent.x : PunctCurent.y;

    const nod: Nod2D = {
        Pk: PunctCurent,
        t: t,
        mv: mv,
        LSON: arboreBinar(puncteSortate.slice(0, mijIndex), adancime + 1),
        RSON: arboreBinar(puncteSortate.slice(mijIndex + 1), adancime + 1)
    };

    return nod;
}

export function cautareInArbore(v: Nod2D | null, D: Dreptunghi, rezultat: Point[]): void {
    if (!v) {
        return;
    }

    let l: number;
    let r: number;

    if (v.t === 1) {
        // Taietura verticala (alpha)
        l = D.alpha1;
        r = D.alpha2;
    } else {
        // Taietură orizontala limitele (beta)
        l = D.beta1;
        r = D.beta2;
    }

    const p = v.Pk;
    const esteInInterior = 
        p.x >= D.alpha1 && p.x <= D.alpha2 && 
        p.y >= D.beta1 && p.y <= D.beta2;

    if (esteInInterior) {
        rezultat.push(p);
    }

    if (v.mv >= l) {
        cautareInArbore(v.LSON, D, rezultat);
    }

    if (v.mv <= r) {
        cautareInArbore(v.RSON, D, rezultat);
    }
}