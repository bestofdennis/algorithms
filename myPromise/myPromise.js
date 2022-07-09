class MyPromise {
    constructor(fn) {
        this.status = 'pending';
        this.result = null;
        this.resolveCallbacks = [];
        this.rejectCallbacks = [];
        try {
            fn(this.resolve.bind(this), this.reject.bind(this));
        } catch(err) {
            this.reject(err);
        }
    }

    resolve(result) {
        if (this.status === 'pending') {
            this.status = 'resolved';
            this.result = result;
            this.resolveCallbacks.forEach(callback => {
                callback(result);
            });
        }
    }

    reject(result) {
        if (this.status === 'pending') {
            this.status = 'rejected';
            this.result = result;
            this.rejectCallbacks.forEach(callback => {
                callback(result);
            });
        }
    }

    then(onFullfilled, onRejected) {
        onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : () => {};
        onRejected = typeof onRejected === 'function' ? onRejected : () => {};

        let newPromise = new MyPromise((resolve, reject) => {
            const resolvePromise = (callback) => {
                setTimeout(() => {
                    try {
                        // 回调函数的返回值，用于then链式调用
                        const returnVal = callback(this.result);

                        if (returnVal instanceof MyPromise) {
                            returnVal.then(resolve, reject);
                        } else {
                            resolve(returnVal);
                        }
                    } catch(err) {
                        reject(err);
                    }
                });
            };

            if (this.status === 'pending') {
                this.resolveCallbacks.push(resolvePromise.bind(this,onFullfilled));
                this.rejectCallbacks.push(resolvePromise.bind(this,onRejected));
            }
            if (this.status === 'resolved') {
                resolvePromise(onFullfilled);
            }
            if (this.status === 'rejected') {
                resolvePromise(onRejected);
            }
        });

        return newPromise;
    }
}
