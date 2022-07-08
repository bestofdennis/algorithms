/*
* 选择列表：用index表示，递归的时候用的是循环变量i
* */
function subset(arr) {
    const len = arr.length;
    let res = [];
    let temp = [];
    let index = 0;
    function backtrack(index, temp) {
        res.push(temp.slice());

        for (let i = index; i < len; ++i) {
            temp.push(arr[i]);
            backtrack(i + 1, temp);
            temp.pop();
        }
    }
    backtrack(index, temp);
    return res;
}
