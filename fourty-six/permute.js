/*
* 路径：已经做出的选择
* 选择列表：当前可做的选择
* 代码架构：
* result = []
* def backtrack(路径，选择列表)：
*   if 满足结束条件：
*       result.add（路径）
*       return
* 
*   for 选择 in 选择列表：
*       做选择
*       backtrack(路径，选择列表)
*       撤销选择
* */
function permute(arr) {
    let res = [];
    let len = arr.length;
    let visited = Array(len).fill(false);
    let temp = [];
    function backtrack(visited, temp) {
        if (temp.length === len) {
            res.push(temp.slice());
            return ;
        }

        for (let i = 0; i < length; ++i) {
            if (visited[i]) continue;
            visited[i] = true;
            temp.push(arr[i]);
            backtrack(visited, temp);
            temp.pop();
            visited[i] = false;
        }
    }
    backtrack(visited, temp);
    return res;
}
