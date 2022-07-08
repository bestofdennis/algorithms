function kthLargest(arr, k) {
    function swap(i, j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    function heapify(pos, len) {
        const l = 2 * pos + 1;
        const r = 2 * pos + 2;
        let x = pos;
        if (l < len && arr[x] < arr[l]) {
            x = l;
        }
        if (r < len && arr[x] < arr[r]) {
            x = r;
        }
        if (x !== pos) {
            swap(x, pos);
            heapify(x, len);
        }
    }

    function popK() {
        // 删除k个元素，即交换后把长度减一k次
        for (let i = arr.length - 1; i >= arr.length - k; --i) {
            swap(0, i);
            heapify(0, i);
        }
    }

    // 构建最大堆，从非叶子结点开始即可
    // 完全二叉树叶子结点个数为Math.ceil(arr.length / 2)
    for (let i = arr.length - Math.ceil(arr.length / 2) - 1; i >= 0; --i) {
        heapify(i, arr.length);
    }
    popK();
    return arr[arr.length - k];
}
