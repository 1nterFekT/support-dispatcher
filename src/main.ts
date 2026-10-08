import type { Request } from "./models/Request.ts";
import { requests } from "./data/requests.ts";
import { heapSort, buildMaxHeap, isMaxHeap } from "./heap/MaxHeap.ts";
import { BinarySearchTree } from "./tree/BinarySeatchTree.ts";
import { formatRequest, formatRequests } from "./utils/format.ts";

function printTreeInfo(tree: BinarySearchTree): void {
    console.log("Симметричный обход:", formatRequests(tree.inOrder()));
    console.log("Кол-во узлов:", tree.countNodes());
    console.log("Высота:", tree.height());
    console.log("BST:", tree.validateBST());
}

function printHeapLevels(data: Request[]): void {
    if (data.length === 0) {
        console.log("Куча пуста");
        return;
    }

    let level = 0;
    let start = 0;
    let levelSize = 1;

    while (start < data.length) {
        const end = Math.min(start + levelSize, data.length);

        const levelElements = data
            .slice(start, end)
            .map(formatRequest)
            .join(" ");

        console.log(`Уровень ${level}: ${levelElements}`);

        start = end;
        levelSize *= 2;
        level++;
    }
}

// Этап 1
console.log("Этап 1. Создание бинарного дерева поиска");

const tree = new BinarySearchTree();

for (const request of requests) {
    tree.insert(request);
}

console.log("Уровневый обход:", formatRequests(tree.levelOrder()));

// Этап 2
console.log();
console.log();
console.log("Этап 2. Обходы дерева");

console.log("Прямой обход:", formatRequests(tree.preOrder()));
console.log("Симметричный обход:", formatRequests(tree.inOrder()));
console.log("Обратный обход:", formatRequests(tree.postOrder()));
console.log("Уровневый обход:", formatRequests(tree.levelOrder()));

// Этап 3
console.log();
console.log();
console.log("Этап 3. Поиск и анализ дерева");

const search65 = tree.search(65);

console.log("Поиск по id = 65:");
console.log("Путь:", search65.path.join(" -> "));

console.log(
    "Результат:",
    search65.request ? formatRequest(search65.request) : "не найден",
);

const search99 = tree.search(99);

console.log();
console.log("Поиск по id = 99:");
console.log("Путь:", search99.path.join(" -> "));

console.log(
    "Результат:",
    search99.request ? formatRequest(search99.request) : "не найден",
);

const minRequest = tree.findMin();
const maxRequest = tree.findMax();

console.log();
console.log("Минимальный ID:", minRequest ? formatRequest(minRequest) : "нет");
console.log("Максимальный ID:", maxRequest ? formatRequest(maxRequest) : "нет");
console.log("Кол-во узлов:", tree.countNodes());
console.log("Кол-во листьев:", tree.countLeaves());
console.log("Высота:", tree.height());
console.log("Глубина узла 65:", tree.getDepth(65));
console.log("BST корректно:", tree.validateBST());

// Этап 4
console.log();
console.log();
console.log("Этап 4. Изменение дерева");

const newRequest: Request = {
    id: 37,
    title: "Утечка данных",
    priority: 16,
};

console.log("1. Добавляем заявку 37");

const inserted37 = tree.insert(newRequest);

console.log("Добавлена:", inserted37);

printTreeInfo(tree);

console.log();
console.log("2. Пытаемся добавить дубликат с id = 50");

const duplicate50: Request = {
    id: 50,
    title: "Дубликат заявки",
    priority: 100,
};

const insertedDuplicate = tree.insert(duplicate50);

console.log("Добавлена:", insertedDuplicate);

printTreeInfo(tree);

console.log();
console.log("4. Удаляем id = 35 (один потомок)");

const deleted35 = tree.delete(35);

console.log("Удален:", deleted35);

printTreeInfo(tree);

console.log();
console.log("5. Удаляем id = 70 (два потомка)");

const deleted70 = tree.delete(70);

console.log("Удален:", deleted70);

printTreeInfo(tree);

console.log();
console.log("6. Пытаемся удалять id = 999");

const deleted999 = tree.delete(999);

console.log("Удален:", deleted999);

printTreeInfo(tree);

// Этап 5
console.log();
console.log();
console.log("Этап 5. Построение двоичной кучи");

const heapData = tree.inOrder();

console.log("Ихсодный массив:", formatRequests(heapData));

buildMaxHeap(heapData);

console.log("Массив после построения кучи:", formatRequests(heapData));

console.log("Куча по уровням:");

printHeapLevels(heapData);

console.log("isMaxHeap():", isMaxHeap(heapData));

// Этап 6
console.log();
console.log();
console.log("Этап 6. Сортировка кучей");

const sortedRequests = [...heapData];

console.log("До сортировки:", formatRequests(sortedRequests));

heapSort(sortedRequests);

console.log("После heap sort:", formatRequests(sortedRequests));
