function findMid(a,b) {
    var n = a.length,
        m = b.length,
        nm = n + m,
        ni = 0, mi = 0, tmp;
    while (ni < n || mi < m) {
        if (ni < n) {
            if (a[ni] <= b[mi] || b[mi] === undefined) {
                ni++;
                if (ni + mi === (nm + 1) / 2) {
                    return a[ni-1];
                }
                else if (ni + mi === nm / 2) {
                    tmp = a[ni-1];
                }
                else if (ni + mi === nm / 2 + 1) {
                    return (a[ni-1] + tmp) / 2;
                }
                
            }
        }
        if (mi < m) {
            if (b[mi] <= a[ni] || a[ni] === undefined) {
                mi++;
                if (ni + mi === (nm + 1) / 2) {
                    return b[mi-1];
                }
                else if (ni + mi === nm / 2) {
                    tmp = b[mi-1];
                }
                else if (ni + mi === nm / 2 + 1) {
                    return (b[mi-1] + tmp) / 2;
                }
                
            }
        }
    }
    return -1;
}
