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
}
