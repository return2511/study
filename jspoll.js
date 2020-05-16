// question : 3. 实现一个异步控制pool使得异步并发控制在5以下 大于5的等待之前的返回再发出去
// 解题思路：
// 1: 构建一个执行队列，首先把并发执行的任务加入队列中，并判断count和limit的值
// 2: 如果当前执行的count 小于limit，则直接执行任务，否则hold住
// 3: 当一个任务执行完毕（resole）时进行判断，count数减1 ，从task队列中取出一个任务执行
// 4: 执行完毕所有任务，返回结果

/**
 * taskList: 任务队列
 * count: 当前已经并发执行的数量
 * limit: 最多并发执行的limit
 */
class TaskLimit {
    constructor(limit = 5) {
        this.taskList = [];
        this.count = 0;
        this.limit = limit;
    }

    // 首先把所有任务扫描加入队列， 根据count和limit去判断是run 还是暂时 hold住
    scanning(task) {
        const { count, limit } = this;
        if (count < limit) {
            return this.run(task)
        } else {
            return this.hold(task)
        }
    }

    // 执行任务，先把count + 1 ，然后在异步任务执行完之后，count 再减1 ，释放任务限制
    run(task) {
        this.count++;
        return task().then(data => {
            this.count--;
            this.wakeUp();
            return data;
        })
    }

    // hold住当前任务 push进任务队列
    hold(task) {
        return new Promise((resolve, reject) => {
            this.taskList.push({ task, resolve, reject })
        })
    }

    // 取当前任务队列的第一个任务执行
    wakeUp() {
        const { count, limit, taskList } = this;
        if (count < limit && taskList.length) {
            const { task, resolve, reject } = taskList.shift();
            this.run(task).then(resolve).catch(reject);
        }
    }
}

// mock生成50 个异步任务（promise模拟异步）， resolve时间为随机数
const list = Array.from({ length: 50 }).map((item, index) => {
    return () => new Promise((resolve) => {
        console.log('list ' + index + ' start')
        setTimeout(() => {
            console.log('object', 'list ' + index + ' done!!!!!!!!!!!!!')
            resolve('list ' + index + ' done')
        }, Math.random() * 1000)
    })}
)

// 使用上面定义的taskLimit 来定义一个jspoll
function jsPoll(list, limit) {
    const taskLimit = new TaskLimit(limit);
    Promise.all(list.map(item => taskLimit.scanning(item))).then((data) => {
        console.log(data)
    })
}

jsPoll(list, 5)