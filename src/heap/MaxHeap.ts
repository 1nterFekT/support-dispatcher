import type { Request } from "../models/Request.js";

function isGreater(a: Request, b: Request): boolean {
    if (a.priority !== b.priority) {
        return a.priority > b.priority;
    }

    return a.id > b.id;
}

export function siftDown(
    data: Request[],
    heapSize: number,
    index: number,
): void {
    while (true) {
        const leftIndex = 2 * index + 1;
        const rightIndex = 2 * index + 2;

        let largestIndex = index;

        if (
            leftIndex < heapSize &&
            isGreater(data[leftIndex]!, data[largestIndex]!)
        ) {
            largestIndex = leftIndex;
        }

        if (
            rightIndex < heapSize &&
            isGreater(data[rightIndex]!, data[largestIndex]!)
        ) {
            largestIndex = rightIndex;
        }

        if (largestIndex === index) {
            break;
        }

        [data[index]!, data[largestIndex]!] = [
            data[largestIndex]!,
            data[index]!,
        ];

        index = largestIndex;
    }
}

export function buildMaxHeap(data: Request[]): void {
    const startIndex = Math.floor(data.length / 2) - 1;

    for (let i = startIndex; i >= 0; i--) {
        siftDown(data, data.length, i);
    }
}

export function isMaxHeap(data: Request[]): boolean {
    for (let i = 0; i < data.length; i++) {
        const leftIndex = 2 * i + 1;
        const rightIndex = 2 * i + 2;

        if (leftIndex < data.length && isGreater(data[leftIndex]!, data[i]!)) {
            return false;
        }

        if (
            rightIndex < data.length &&
            isGreater(data[rightIndex]!, data[i]!)
        ) {
            return false;
        }
    }

    return true;
}

export function heapSort(data: Request[]): void {
    buildMaxHeap(data);

    for (let heapSize = data.length - 1; heapSize > 0; heapSize--) {
        [data[0]!, data[heapSize]!] = [data[heapSize]!, data[0]!];

        siftDown(data, heapSize, 0);
    }
}
