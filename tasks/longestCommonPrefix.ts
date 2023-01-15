// https://leetcode.com/problems/implement-trie-prefix-tree/solutions/127843/official-solution/
// https://www.geeksforgeeks.org/introduction-to-trie-data-structure-and-algorithm-tutorials/
// https://gist.github.com/tpae/72e1c54471e88b689f85ad2b3940a8f0

function longestCommonPrefix(strs: string[]): string {
    const length = strs.length;

    if (length === 1) {
        return strs[0];
    }

    const trie = new Trie();

    strs.forEach((w) => {
        trie.insert(w);
    });

    return trie.lookupCommonString(trie.root);
};

class TrieNode {
    children: TrieNode[] = [];
    key: string = '';
    isEnd: boolean = false;

    constructor(key: string) {
        this.key = key;
    }
}

class Trie {
    root = new TrieNode('');

    // time complexity: O(k), k = word length
    insert(key: string) {
        // start root
        let currentNode = this.root;

        if (key.length) {
            for(let i=0; i<key.length; i++) {
                let child = currentNode.children.find((c) => c.key === key[i]);
                if (!child) {
                    // If node for current character does not exist
                    child = new TrieNode(key[i])
                    currentNode.children.push(child)
                }
                currentNode = child;
            }
            currentNode.isEnd = true;
        } else {
            let child = currentNode.children.find((c) => c.key === key);
            if (!child) {
                // If node for current character does not exist
                child = new TrieNode(key)
                currentNode.children.push(child)
                currentNode.isEnd = true;
            }
        }
    }

    lookupCommonString(node: TrieNode): string {
        let common: string = '';

        if (node.children.length === 1 && !node.isEnd) {
            common = common + node.key;
            return common + this.lookupCommonString(node.children[0]);
        }
        return node.key;
    }
}
