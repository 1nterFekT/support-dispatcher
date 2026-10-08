import type { Request } from "../models/Request.js";
import { TreeNode } from "./TreeNode.js";

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
}
