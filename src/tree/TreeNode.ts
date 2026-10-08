import type { Request } from "../models/Request.js";

export class TreeNode {
    public request: Request;
    public left: TreeNode | null = null;
    public right: TreeNode | null = null;

    constructor(request: Request) {
        this.request = request; 
    }
}