import type { Request } from "../models/Request.ts";
import { TreeNode } from "./TreeNode.ts";

export type SearchResult = {
    request: Request | null;
    path: number[];
};

export class BinarySearchTree {
    private root: TreeNode | null = null;

    public insert(request: Request): boolean {
        if (this.root === null) {
            this.root = new TreeNode(request);
            return true;
        }

        let current = this.root;

        while (true) {
            if (request.id === current.request.id) {
                return false;
            }

            if (request.id < current.request.id) {
                if (current.left === null) {
                    current.left = new TreeNode(request);
                    return true;
                }

                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = new TreeNode(request);
                    return true;
                }

                current = current.right;
            }
        }
    }

    public search(requestId: number): SearchResult {
        const path: number[] = [];
        let current = this.root;

        while (current !== null) {
            path.push(current.request.id);

            if (requestId === current.request.id) {
                return {
                    request: current.request,
                    path,
                };
            }

            if (requestId < current.request.id) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return {
            request: null,
            path,
        };
    }

    public findMin(): Request | null {
        if (this.root === null) {
            return null;
        }

        let current = this.root;

        while (current.left !== null) {
            current = current.left;
        }

        return current.request;
    }

    public findMax(): Request | null {
        if (this.root === null) {
            return null;
        }

        let current = this.root;

        while (current.right !== null) {
            current = current.right;
        }

        return current.request;
    }

    public preOrder(): Request[] {
        const result: Request[] = [];

        const traverse = (node: TreeNode | null): void => {
            if (node === null) {
                return;
            }

            result.push(node.request);
            traverse(node.left);
            traverse(node.right);
        };

        traverse(this.root);

        return result;
    }

    public inOrder(): Request[] {
        const result: Request[] = [];

        const traverse = (node: TreeNode | null): void => {
            if (node === null) {
                return;
            }

            traverse(node.left);
            result.push(node.request);
            traverse(node.right);
        };

        traverse(this.root);

        return result;
    }

    public postOrder(): Request[] {
        const result: Request[] = [];

        const traverse = (node: TreeNode | null): void => {
            if (node === null) {
                return;
            }

            traverse(node.left);
            traverse(node.right);
            result.push(node.request);
        };

        traverse(this.root);

        return result;
    }

    public levelOrder(): Request[] {
        const result: Request[] = [];

        if (this.root === null) {
            return result;
        }

        const queue: TreeNode[] = [this.root];
        let index = 0;

        while (index < queue.length) {
            const node = queue[index];
            index++;

            result.push(node!.request);

            if (node!.left !== null) {
                queue.push(node!.left);
            }

            if (node!.right !== null) {
                queue.push(node!.right);
            }
        }

        return result;
    }

    public countNodes(): number {
        const count = (node: TreeNode | null): number => {
            if (node === null) {
                return 0;
            }

            return 1 + count(node.left) + count(node.right);
        };

        return count(this.root);
    }

    public countLeaves(): number {
        const count = (node: TreeNode | null): number => {
            if (node === null) {
                return 0;
            }

            if (node.left === null && node.right === null) {
                return 1;
            }

            return count(node.left) + count(node.right);
        };

        return count(this.root);
    }

    public height(): number {
        const getHeight = (node: TreeNode | null): number => {
            if (node === null) {
                return 0;
            }

            return 1 + Math.max(getHeight(node.left), getHeight(node.right));
        };

        return getHeight(this.root);
    }

    public getDepth(requestId: number): number | null {
        let current = this.root;
        let depth = 0;

        while (current !== null) {
            if (requestId === current.request.id) {
                return depth;
            }

            if (requestId < current.request.id) {
                current = current.left;
            } else {
                current = current.right;
            }

            depth++;
        }

        return null;
    }

    public validateBST(): boolean {
        const validate = (
            node: TreeNode | null,
            min: number | null,
            max: number | null,
        ): boolean => {
            if (node === null) {
                return true;
            }

            const id = node.request.id;

            if (min !== null && id <= min) {
                return false;
            }

            if (max !== null && id >= max) {
                return false;
            }

            return (
                validate(node.left, min, id) && validate(node.right, id, max)
            );
        };

        return validate(this.root, null, null);
    }

    public delete(requestId: number): boolean {
        const deleteNode = (
            node: TreeNode | null,
            id: number,
        ): TreeNode | null => {
            if (node === null) {
                return null;
            }

            if (id < node.request.id) {
                node.left = deleteNode(node.left, id);
                return node;
            }

            if (id > node.request.id) {
                node.right = deleteNode(node.right, id);
                return node;
            }

            if (node.left === null && node.right === null) {
                return null;
            }

            if (node.left === null) {
                return node.right;
            }

            if (node.right === null) {
                return node.left;
            }

            let successor = node.right;

            while (successor.left !== null) {
                successor = successor.left;
            }

            node.request = successor.request;

            node.right = deleteNode(node.right, successor.request.id);

            return node;
        };

        const oldCount = this.countNodes();

        this.root = deleteNode(this.root, requestId);

        return this.countNodes() < oldCount;
    }

    public getRoot(): TreeNode | null {
        return this.root;
    }
}
