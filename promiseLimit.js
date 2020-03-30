

// taskList 任务队列
// count 当前进程中的任务数量
// limit 限制最大任务数量
function TaskLimit (limit) {
    this.taskList = []
    this.count = 0
    this.limit = limit
}

// scanning 队列扫描

TaskLimit.prototype.scanning = function(fn) {
    const { limit , count } = this;
    if (limit >= count) {
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
        this.taskList.push(func, resolve, reject)
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
        resolve('list '+ index +' done')
    }, (index + 1))
}))

Promise.map = function(list, limit = 10) {
    const taskLimit = new TaskLimit(limit);
    Promise.all(list.map(item => taskLimit.scanning(item))).then((data) => {
        console.log(data)
    })
}

Promise.map(list, 10);
