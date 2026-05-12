import {
    sortarePuncte, 
    mapeazaPuncte, 
    reorientareMuchii, 
    construireaMultimilor, 
    construireaLespezilor, 
    localizarePunct 
} from '../PSLG';

const puncte = [
    { id: 1, x: 4, y: 10 },
    { id: 2, x: -4, y: 0 },
    { id: 3, x: 2, y: -4 },
    { id: 4, x: 8, y: -2 },
    { id: 5, x: 1, y: -7 },
    { id: 6, x: -1, y: 6 },
    { id: 7, x: 6, y: 13 },
    { id: 8, x: -2, y: 11 },
    { id: 9, x: 8, y: 3 },
    { id: 10, x: 1, y: 15 },
    { id: 11, x: -6, y: 8 }
];

const muchii = [
    { id: 1, v1: 3, v2: 9, r1: 5, r2: 6 },  
    { id: 2, v1: 4, v2: 9, r1: 6, r2: 0 },  
    { id: 3, v1: 3, v2: 2, r1: 7, r2: 5 },   
    { id: 4, v1: 2, v2: 9, r1: 2, r2: 5 },  
    { id: 5, v1: 2, v2: 6, r1: 1, r2: 2 },  
    { id: 6, v1: 2, v2: 11, r1: 0, r2: 1 }, 
    { id: 7, v1: 11, v2: 8, r1: 0, r2: 1 }, 
    { id: 8, v1: 6, v2: 8, r1: 1, r2: 2 },  
    { id: 9, v1: 9, v2: 8, r1: 2, r2: 3 },  
    { id: 10, v1: 9, v2: 1, r1: 3, r2: 0 }, 
    { id: 11, v1: 1, v2: 7, r1: 4, r2: 0 }, 
    { id: 12, v1: 7, v2: 10, r1: 4, r2: 0 },
    { id: 13, v1: 8, v2: 10, r1: 0, r2: 3 },
    { id: 14, v1: 1, v2: 10, r1: 3, r2: 4 },
    { id: 15, v1: 5, v2: 4, r1: 6, r2: 0 }, 
    { id: 16, v1: 5, v2: 2, r1: 0, r2: 7 }, 
    { id: 17, v1: 5, v2: 3, r1: 7, r2: 6 }  
];

describe('Algoritm Localizare PSLG (Metoda Fâșiilor)', () => {

    let idMap: any;
    let punctulDupaNoulId: any;
    let muchiiProcesate: any[];
    let istoricL: any[];
    const nrVarfuri = puncte.length;

    beforeAll(() => {
        const puncteSortate = sortarePuncte(puncte);
        const mapare = mapeazaPuncte(puncteSortate);
        idMap = mapare.idMap;
        punctulDupaNoulId = mapare.punctulDupaNoulId;
        muchiiProcesate = reorientareMuchii(muchii, idMap);
        const seturiAB = construireaMultimilor(muchiiProcesate, punctulDupaNoulId, nrVarfuri);
        istoricL = construireaLespezilor(seturiAB, muchiiProcesate, punctulDupaNoulId, nrVarfuri);
    });

    it('Ar trebui să localizeze corect în Fața 7 (Jos-Stânga)', () => {
        const punctM = { x: 0, y: -3 };
        const rezultat = localizarePunct(punctM, istoricL, muchiiProcesate, punctulDupaNoulId, nrVarfuri);
        
        expect(rezultat).toBe('F7');
    });

    it('Ar trebui să localizeze corect în Fața 6 (Jos-Dreapta)', () => {
        const punctM = { x: 4, y: -4 };
        const rezultat = localizarePunct(punctM, istoricL, muchiiProcesate, punctulDupaNoulId, nrVarfuri);
        
        expect(rezultat).toBe('F6');
    });

    it('Ar trebui să localizeze corect în Fața 0 (Exterior Stânga)', () => {
        const punctM = { x: -8, y: 0 };
        const rezultat = localizarePunct(punctM, istoricL, muchiiProcesate, punctulDupaNoulId, nrVarfuri);

        expect(rezultat).toBe('F0');
    });

    it('Ar trebui să localizeze corect în Fața 1 (Stânga Sus)', () => {
        const punctM = { x: -3, y: 6 };
        const rezultat = localizarePunct(punctM, istoricL, muchiiProcesate, punctulDupaNoulId, nrVarfuri);
        
        expect(rezultat).toBe('F1');
    });

    it('Ar trebui să localizeze corect în Fața 2 (Centru)', () => {
        const punctM = { x: 0, y: 2 };
        const rezultat = localizarePunct(punctM, istoricL, muchiiProcesate, punctulDupaNoulId, nrVarfuri);
        
        expect(rezultat).toBe('F2');
    });

    it('Ar trebui să detecteze un punct aflat pe muchie', () => {
        const punctM = { x: -2.5, y: 3 };
        const rezultat = localizarePunct(punctM, istoricL, muchiiProcesate, punctulDupaNoulId, nrVarfuri);
        
        expect(rezultat).toContain('Punctul este pe muchia ');
    });

    it('Ar trebui să returneze eroare/exterior pentru puncte în afara limitelor Y', () => {
        const punctM = { x: 0, y: -100 };
        const rezultat = localizarePunct(punctM, istoricL, muchiiProcesate, punctulDupaNoulId, nrVarfuri);
        
        expect(rezultat).toBe('F0'); 
    });
});