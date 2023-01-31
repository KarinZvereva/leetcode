
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}


/**
 *  Recursive Approach
 */
// function inorderTraversal(root: TreeNode | null): number[] {
//     if (!root) return [];
//
//     const result: number[] = [];
//
//     const left = inorderTraversal(root.left);
//     left.push(root.val);
//     const right = inorderTraversal(root.right);
//
//     return left.concat(right);
// };


/**
 *  Morris Traversal
 */
function inorderTraversal(root: TreeNode | null): number[] {
    if (!root) return [];

    const result = [];
    let current = root;

    while(current !== null) {

        if (current.left === null) {
            result.push(current.val);
            current = current.right;
        } else {
            let leftSubtree = current.left;
            // the most right node without right children node (rightmost)
            while (leftSubtree.right !== null) {
                leftSubtree = leftSubtree.right;
            }
            const temp = current.left;
            current.left = null; // original current left be null, avoid infinite loops
            leftSubtree.right = current;
            current = temp;

        }
    }

    return result;
};
