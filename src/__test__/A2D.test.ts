import {Point, Dreptunghi, arboreBinar, cautareInArbore} from '../A2D';

const puncteTest: Point[] = [
    { x: 5, y: 7, nume: 'P1' },
    { x: 20, y: 12, nume: 'P2' },
    { x: 1, y: 1, nume: 'P3' },
    { x: 15, y: 9, nume: 'P4' },
    { x: 10, y: 10, nume: 'P5' },
    { x: 3, y: 4, nume: 'P6' },
    { x: 14, y: 13, nume: 'P7' },
    { x: 4, y: 14, nume: 'P8' },
    { x: 12, y: 6, nume: 'P9' },
    { x: 8, y: 15, nume: 'P10' },
    { x: 19, y: 3, nume: 'P11' },
    { x: 9, y: 2, nume: 'P12' },
    { x: 18, y: 8, nume: 'P13' }
];

const D1: Dreptunghi = { alpha1: 2, alpha2: 6, beta1: 3, beta2: 8 };
const D2: Dreptunghi = { alpha1: 7, alpha2: 17, beta1: 5, beta2: 11 };

const arbore = arboreBinar([...puncteTest]);

test('Căutare în arborele 2D pentru dreptunghiul D1', () => {
    const rezultat: Point[] = [];
    cautareInArbore(arbore, D1, rezultat);
    const numePuncte = rezultat.map(p => p.nume).sort();
    expect(numePuncte).toEqual(['P1', 'P6']);
});

test('Căutare în arborele 2D pentru dreptunghiul D2', () => {
    const rezultat: Point[] = [];
    cautareInArbore(arbore, D2, rezultat);
    const numePuncte = rezultat.map(p => p.nume).sort();
    expect(numePuncte).toEqual(['P4', 'P5', 'P9']);
});