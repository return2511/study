// question: 4 现有个耗时的函数 改造他使其不阻塞do的执行 for(999) do()

// function bigTask(callback) {
//     for (var i = 0; i < 999; i++) { }
//     do ()
// }


function doSth() {
    console.log('this is do funtion')
}

function task(resolve) {
    console.log('async start')
    for (var i = 0; i < 999; i++) { }
    console.log('async end')
    resolve('async task result')
}

// 我这边的解题思路是利用js的异步非阻塞特性
// 即在js的事件机制中，异步任务会交给别的线程去执行，而让出js主执行线程(我这里使用了setTimeout执行线程)
// 在异步任务执行完成之后，通过回调任务的方式，在主线程空闲时把回调的task推入主线程执行回调
function bigTask() {
    // js的执行线程是单线程，如果这个任务耗时时间过长，会阻碍后面任务执行
    // for (var i = 0; i < 999; i++) { }
    // doSth();
    const asyncTask = new Promise((resolve) => {
        setTimeout(() => {
            task(resolve)
        }, 0);
    })

    // 如果后续有以来这个大计算量的结果的操作，使用then来使用大计算的结果
    asyncTask.then(data => console.log(data))

    // 执行同步任务（题目中的do function）
    doSth()
}

bigTask()