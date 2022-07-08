/*
* 动态规划
* 备忘录：[]
* 状态转移函数：
* */
function uniquePaths(m, n) {
    let memo = Array(m).fill(0).map(item => {
        return Array(n).fill(0);
    });
    for (let i = 0; i < m; ++i) {
        memo[i][0] = 1;
    }
    for (let j = 0; j < n; ++j) {
        memo[0][j] = 1;
    }
    for (let i = 1; i < m; ++i) {
        for (let j = 1; j < n; ++j) {
            memo[i][j] = memo[i][j-1] + memo[i-1][j];
        }
    }
    return memo[m-1][n-1];
}
