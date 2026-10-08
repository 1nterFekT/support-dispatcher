import type { Request } from "../models/Request.ts";

export class TreeNode {
    public request: Request;
    public left: TreeNode | null = null;
    public right: TreeNode | null = null;

    constructor(request: Request) {
        this.request = request; 
    }
}