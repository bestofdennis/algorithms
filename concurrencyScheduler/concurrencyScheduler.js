class Scheduler {
    constructor(maxExcutingNum = 1) {
        this.waitTasks = [];
        this.excutingTasks = [];
        this.maxExcutingNum = maxExcutingNum;
    }
    add(promiseMaker) {
        if (this.excutingTasks.length >= this.maxExcutingNum) {
            this.waitTasks.push(promiseMaker);
        } else {
            this.run(promiseMaker);
        }
    }
    run(promiseMaker) {
        const index = this.excutingTasks.push(promiseMaker) - 1;
        promiseMaker().finally(res => {
            this.excutingTasks.splice(index, 1);
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
