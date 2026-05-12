export interface Point { x: number; y: number; nume?: string;}  
export function determinant(p1: Point, p2: Point, p3: Point): number 
{ 
    const d = p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y);
    return d; 
} 
function semn (val: number): string {
    if (val === 0)
    {
        return "0";
    }
    else
    {
        if (val > 0)
        {
            return "-";
        }
        return "+";
    }
}
function localizeazaPunct(s1: string, s2: string, s3: string): string {
    if (s1 === "0" || s2 === "0" || s3 === "0") {
        return "PE MUCHIE";
    }

    if (s1 === s2 && s2 === s3) {
        return "INTERIOR";
    }

    return "EXTERIOR";
}

export function semneMuchii(A: Point, B: Point, C: Point, M: Point) {
    const s_AB = semn(determinant(A, B, M));
    const s_BC = semn(determinant(B, C, M));
    const s_CA = semn(determinant(C, A, M));
    
    const locatie = localizeazaPunct(s_AB, s_BC, s_CA);

    return {
        Punct: M.nume || `(${M.x}, ${M.y})`,
        AB: s_AB,
        BC: s_BC,
        CA: s_CA,
        Locatie: locatie 
    };
}

export function afiseazaTabel(A: Point, B: Point, C: Point, puncte: Point[]) {
  console.log(`\nLocalizare Puncte în raport cu Triunghiul: ${A.nume || 'A'}-${B.nume || 'B'}-${C.nume || 'C'}`);
  const tabel = puncte.map(p => semneMuchii(A, B, C, p));
  console.table(tabel);
}
