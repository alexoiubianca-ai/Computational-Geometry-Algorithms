export type Punct = { id: number, x: number, y: number };
export type Muchie = { id: number, v1: number, v2: number };
export type Fata = { Puncte: number[] };

function determinant(P1: Punct, P2: Punct, M: Punct): number {
    return (P2.x - P1.x) * (M.y - P1.y) - (P2.y - P1.y) * (M.x - P1.x);
}

export function sortarePuncte (P: Punct[]): Punct[] {
    const puncteSortate = [...P];
    puncteSortate.sort((Pi, Pj) => {
        return Pi.y - Pj.y;
    });
    return puncteSortate;
}

export function mapeazaPuncte(puncteSortate: any[]) {
    let idMap = {};
    let punctulDupaNoulId = {};

    puncteSortate.forEach((P, index) => {
        let newId = index + 1;
        P.newId = newId; 
        
        idMap[P.id] = newId;
        punctulDupaNoulId[newId] = P;
    });

    return { idMap, punctulDupaNoulId };
}

export function reorientareMuchii(muchii: any[], idMap: any) {
    let muchiiProcesate = [];

    for (let i = 0; i < muchii.length; i++) {
        let e = muchii[i];

        let newV1 = idMap[e.v1];
        let newV2 = idMap[e.v2];

        let finalV1 = newV1;
        let finalV2 = newV2;
        let finalR1 = e.r1;
        let finalR2 = e.r2;
        let finalM1 = e.m1;
        let finalM2 = e.m2;

        if (newV1 > newV2) {
            finalV1 = newV2;
            finalV2 = newV1;
            finalR1 = e.r2;
            finalR2 = e.r1;
            finalM1 = e.m2;
            finalM2 = e.m1;
        }

        muchiiProcesate.push({
            id: e.id,
            v1: finalV1,
            v2: finalV2,
            r1: finalR1,
            r2: finalR2,
            m1: finalM1,
            m2: finalM2
        });
    }
    return muchiiProcesate;
}

export function construireaMultimilor(muchiiProcesate: any[], punctulDupaNoulId: any, nrVarfuri: number) {

    let Ai = []; 
    let Bi = []; 
    
    for (let k = 0; k <= nrVarfuri; k++) {
        Ai[k] = [];
        Bi[k] = [];
    }

    muchiiProcesate.forEach(e => {
        Bi[e.v1].push(e.id);
        Ai[e.v2].push(e.id);
    });

    const sortareDupaId = (idVarf: number, idMuchii: number[]) => {
        let origine = punctulDupaNoulId[idVarf];
        
        return idMuchii.sort((id1, id2) => {
            let muchia1 = muchiiProcesate.find(ed => ed.id === id1);
            let muchia2 = muchiiProcesate.find(ed => ed.id === id2);

            let idCelalalt1;
            if (muchia1.v1 === idVarf) {
                idCelalalt1 = muchia1.v2;
            } else {
                idCelalalt1 = muchia1.v1;
            }
            let idCelalalt2;
            if (muchia2.v1 === idVarf) {
                idCelalalt2 = muchia2.v2;
            } else {
                idCelalalt2 = muchia2.v1;
            }

            let P1 = punctulDupaNoulId[idCelalalt1];
            let P2 = punctulDupaNoulId[idCelalalt2];

            let det = determinant(origine, P1, P2);
            
            return det; 
        });
    };
    let seturiA: number[][] = [];
    let seturiB: number[][] = [];

    for(let i=1; i<=nrVarfuri; i++) {
        seturiA[i] = sortareDupaId(i, Ai[i]);
        seturiB[i] = sortareDupaId(i, Bi[i]);
    }
    return { A: seturiA, B: seturiB };
}

export function construireaLespezilor(
    sets: { A: number[][], B: number[][] }, 
    muchiiProcesate: any[], 
    punctulDupaNoulId: any, 
    numarVarfuri: number
) {
    let L: number[] = [];
    let istoricL: any[] = [];

    const getXLaY = (idMuchie: number, yTinta: number) => {
        let e = muchiiProcesate.find(ed => ed.id === idMuchie);
        
        let p1 = punctulDupaNoulId[e.v1];
        let p2 = punctulDupaNoulId[e.v2];

        if (p2.y === p1.y) return p1.x;

        let pantaInversa = (p2.x - p1.x) / (p2.y - p1.y);
        let xCalculat = p1.x + (yTinta - p1.y) * pantaInversa;
        
        return xCalculat;
    };

    for (let i = 1; i < numarVarfuri; i++) {
        let Ai = sets.A[i]; 
        let Bi = sets.B[i]; 

        L = L.filter(id => !Ai.includes(id));
        L = [...L, ...Bi];

        let yJos = punctulDupaNoulId[i].y;
        let ySus = punctulDupaNoulId[i + 1].y;
        let yMijloc = (yJos + ySus) / 2;

        L.sort((id1, id2) => {
            let x1 = getXLaY(id1, yMijloc);
            let x2 = getXLaY(id2, yMijloc);
            return x1 - x2;
        });

        istoricL[i] = [...L];
    }
    return istoricL;
}

export function localizarePunct(
    M: { x: number, y: number }, 
    istoricL: number[][],
    muchiiProcesate: any[], 
    punctulDupaNoulId: any,
    numarVarfuri: number
) {
    let slabIndex = -1;
    let stanga = 1; 
    let dreapta = numarVarfuri - 1; 

    let yMin = punctulDupaNoulId[1].y;
    let yMax = punctulDupaNoulId[numarVarfuri].y;

    if (M.y < yMin || M.y > yMax) {
        return "F0";
    }

    while (stanga <= dreapta) {
        let mid = (stanga + dreapta + 1) / 2;
        let pJos = punctulDupaNoulId[mid];
        let pSus = punctulDupaNoulId[mid + 1];

        if (M.y >= pJos.y && M.y <= pSus.y) {
            slabIndex = mid;
            break;
        } else if (M.y < pJos.y) {
            dreapta = mid - 1;
        } else {
            stanga = mid + 1;
        }
    }

    if (slabIndex === -1) return "Eroare: Fâșia nu a fost găsită.";
    console.log(`Punctul se află în Fâșia ${slabIndex}`);

    let idMuchii = istoricL[slabIndex];
    
    if (!idMuchii || idMuchii.length === 0) return "F0";

    const getDet = (IdMuchie: number) => {
        let e = muchiiProcesate.find(ed => ed.id === IdMuchie);
        let pStart = punctulDupaNoulId[e.v1];
        let pEnd = punctulDupaNoulId[e.v2]; 
        
        return (pEnd.x - pStart.x) * (M.y - pStart.y) - (pEnd.y - pStart.y) * (M.x - pStart.x);
    };

    let low = 0;
    let high = idMuchii.length - 1;
    let IdMuchieStanga = -1;

    while (low <= high) {
        let mid = (low + high + 1) / 2;
        let IdMuchie = idMuchii[mid];
        let det = getDet(IdMuchie);

        if (det === 0 ) { 
            return `Punctul este pe muchia ${IdMuchie}`;
        } else if (det > 0) {
            high = mid - 1;
        } else { 
            IdMuchieStanga = mid;
            low = mid + 1;
        }
    }

    //Punctul este la stânga primei muchii
    if (IdMuchieStanga === -1) {
        let primaMuchie = muchiiProcesate.find(e => e.id === idMuchii[0]);
        return `F${primaMuchie.r1}`;
    }

    //Punctul este la dreapta ultimei muchii
    if (IdMuchieStanga === idMuchii.length - 1) {
        let ultimaMuchie = muchiiProcesate.find(e => e.id === idMuchii[IdMuchieStanga]);
        return `F${ultimaMuchie.r2}`;
    }

    //Punctul este între două muchii
    let IdMuchieStg = idMuchii[IdMuchieStanga];
    let IdMuchieDr = idMuchii[IdMuchieStanga + 1];
    
    let ObMuchieiStg = muchiiProcesate.find(e => e.id === IdMuchieStg);
    let ObMuchieiDr = muchiiProcesate.find(e => e.id === IdMuchieDr);

    return `F${ObMuchieiStg.r2}`;
}