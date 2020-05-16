
// 任务队列，最多并发10个请求，如果请求数多就hold住，执行完成一个任务之后，后续任务进入队列执行
// taskList 任务队列
// count 当前进程中的任务数量
// limit 限制最大任务数量
function TaskLimit (limit) {
    this.taskList = []
    this.count = 0
    this.limit = limit
}

// scanning 队列扫描
// run: 去执行队列
// hold: promise推入暂存队列
TaskLimit.prototype.scanning = function(fn) {
    const { limit , count } = this;
    console.log('count', count)
    if (limit <= count) {
        return this.hold(fn);
    } else {
        return this.run(fn);
    }
}

TaskLimit.prototype.run = function(func) {
    this.count ++ ;
    return func().then(data => {
        this.count -- ;
        this.wakeUp() ;
        return data;
    })
}

TaskLimit.prototype.hold = function(func) {
    return new Promise((resolve, reject) => {
        this.taskList.push({ func, resolve, reject })
    })
}

TaskLimit.prototype.wakeUp = function() {
    const { count, limit, taskList } = this;
    if (count < limit && taskList.length) {
        const { func, resolve, reject } = taskList.shift();
        this.run(func).then(resolve).catch(reject);
    }
}

// mock生成100 个请求， resolve时间为随机数
const list = Array.from({ length: 100 }).map(
    (item, index) => () => new Promise((resolve) => {
    console.log('list '+ index +' go')
    setTimeout(() => {
        console.log('object', 'list ' + index + ' done!!!!!!!!!!!!!')
        resolve('list '+ index +' done')
    }, Math.random() * 1000)
}))

Promise.map = function(list, limit = 10) {
    const taskLimit = new TaskLimit(limit);
    Promise.all(list.map(item => taskLimit.scanning(item))).then((data) => {
        console.log(data)
    })
}

Promise.map(list, 10);
