// https://leetcode.com/problems/last-stone-weight/
// https://leetcode.com/problems/single-threaded-cpu/
// https://leetcode.com/problems/find-k-th-smallest-pair-distance/

function lastStoneWeight(stones: number[]): number {

    const maxHeap = new MaxHeap();

    for (let s of stones) {
        maxHeap.insert(s);
    }

    while(maxHeap.hasPair()) {
        const firstMax = maxHeap.extractMax();
        const secondMax = maxHeap.extractMax();

        if (firstMax !== secondMax) {
            maxHeap.insert(firstMax - secondMax);
        }
    }

    if (maxHeap.nodes.length === 1) {
        return maxHeap.nodes[0];
    }

    return 0;
};


class MaxHeap {
    nodes: number[] = [];

    hasPair() {
        return this.nodes.length >= 2;
    }

    insert(val: number) {
        this.nodes.push(val);
        if (this.nodes.length >= 2) this.heapify();
    }

    extractMax(): number {
        return this.nodes.shift();
    }

    heapify() {
        let idx = this.nodes.length - 1;
        while (idx > 0) {
            const prevVal = this.nodes[idx - 1];
            if (prevVal >= this.nodes[idx]) {
                break;
            }
            const tmp = this.nodes[idx];
            this.nodes[idx] = prevVal;
            this.nodes[idx - 1] = tmp;
            idx--;
        }
    }
}
