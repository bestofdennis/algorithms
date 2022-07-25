class Scheduler {
    constructor(maxExcutingNum = 1) {
        this.waitTasks = [];
        this.excutingTasks = new Map();
        this.maxExcutingNum = maxExcutingNum;
    }
    add(promiseMaker) {
        if (this.excutingTasks.size >= this.maxExcutingNum) {
            this.waitTasks.push(promiseMaker);
        } else {
            this.run(promiseMaker);
        }
    }
    run(promiseMaker) {
        const s = Symbol();
        this.excutingTasks.set(s, promiseMaker);
        promiseMaker().finally(res => {
            this.excutingTasks.delete(s);
            if (this.waitTasks.length) {
                this.run(this.waitTasks.shift())
            }
        })
    }
}


const scheduler = new Scheduler();

const timeout = time =>
    new Promise(resolve => {
        setTimeout(resolve, time);
    });

function addTask(delay, num) {
    scheduler.add(() =>
        timeout(delay).then(val => {
            console.log(num);
        })
    );
}

addTask(1000, '1');
addTask(1000, '2');
addTask(1000, '3');
addTask(1000, '4');
