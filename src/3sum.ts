type Point = { x: number; y: number };

const comparePoints = (p1: Point, p2: Point): number =>
    p1.x === p2.x ? p1.y - p2.y : p1.x - p2.x;

function merge<T>(left: T[], right: T[], compare: (a: T, b: T) => number): T[] {
    const result: T[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        const leftItem = left[leftIndex];
        const rightItem = right[rightIndex];
        
        if (leftItem !== undefined && rightItem !== undefined) {
            if (compare(leftItem, rightItem) <= 0) {
                result.push(leftItem);
                leftIndex++;
            } else {
                result.push(rightItem);
                rightIndex++;
            }
        }
    }

    while (leftIndex < left.length) {
        const leftItem = left[leftIndex];
        if (leftItem !== undefined) {
            result.push(leftItem);
        }
        leftIndex++;
    }

    while (rightIndex < right.length) {
        const rightItem = right[rightIndex];
        if (rightItem !== undefined) {
            result.push(rightItem);
        }
        rightIndex++;
    }

    return result;
}

function mergeSort<T>(arr: T[], compare: (a: T, b: T) => number): T[] {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(
        mergeSort(left, compare),
        mergeSort(right, compare),
        compare
    );
}

function findIntersection(A: Point[], B: Point[], C: Point[]): { intersection: Point, points: { a: Point, b: Point, c: Point } } | null {

    if (A.length !== B.length || B.length !== C.length) {
        throw new Error('Toate multimile trebuie sa abia acelasi numar de puncte.');
    }

    const n = A.length;
    if (n === 0) {
        throw new Error('Multimile nu trebuie sa fie goale.');
    }

    const sortedB = mergeSort([...B], comparePoints);
    const doubledB = sortedB.map((b: Point) => ({ x: 2 * b.x, y: 2 * b.y }));
    const sortedA = mergeSort([...A], comparePoints);

    for (let k = 0; k < n; k++) {
        const currentC = C[k];
        if (!currentC) continue;

        const sums = sortedA.map((a: Point) => ({
            x: a.x + currentC.x,
            y: a.y + currentC.y,
            originalA: a,
            originalC: currentC
        }));

        let i = 0; 
        let j = 0; 
        while (i < sums.length && j < doubledB.length) {
            const sumItem = sums[i];
            const bItem = doubledB[j];

            if (!sumItem) { i++; continue; }
            if (!bItem) { j++; continue; }

            const sumPoint: Point = { x: sumItem.x, y: sumItem.y };
            const bPoint: Point = bItem;

            const cmp = comparePoints(sumPoint, bPoint);
            if (cmp === 0) {
                const matchingB = sortedB[j];
                if (matchingB) {
                    return {
                        intersection: sumPoint,
                        points: {
                            a: sumItem.originalA,
                            b: matchingB,
                            c: sumItem.originalC
                        }
                    };
                }
                j++;
            } else if (cmp < 0) {
                i++;
            } else {
                j++;
            }
        }
    }

    return null;
}

function algorithm(A: Point[], B: Point[], C: Point[]): void {
    try {
        const result = findIntersection(A, B, C);
        if (result) {
            const { intersection, points } = result;
            console.log('Exista 3 puncte coliniare!');
            console.log('Intersectia punctelor:', intersection);
            console.log('Punctele:');
            console.log('A:', points.a);
            console.log('B:', points.b);
            console.log('C:', points.c);
        } else {
            console.log("Nu exista puncte coliniare.");
        }
    } 
catch (error) {
        if (error instanceof Error) {
            console.error('Eroare:', error.message);
        } else {
            console.error('A apărut o eroare neașteptată.');
        }
    }
}
const testPoints = {
    A: [
        { x: 1, y: 2 },
        { x: 0, y: 1 },
        { x: 3, y: 1 }
    ],
    B: [
        { x: 1, y: 3 },
        { x: 2, y: 2 },
        { x: 0, y: 4 }
    ],
    C: [
        { x: 1, y: 4 },
        { x: 2, y: 1 },
        { x: 3, y: 3 }
    ]
};

algorithm(testPoints.A, testPoints.B, testPoints.C);
