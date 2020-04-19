
const promise1 = new Promise((resolve, reject) => { setTimeout(() => {resolve('promise1')}, 3000)})
const promise2 = new Promise((resolve, reject) => { setTimeout(() => { resolve('promise2') }, 2000) })
const promise3 = new Promise((resolve, reject) => { setTimeout(() => { resolve('promise3') }, 1000) })
const promise4 = new Promise((resolve, reject) => { setTimeout(() => { resolve('promise4') }, 1500) })
const promise5 = new Promise((resolve, reject) => { setTimeout(() => { resolve('promise5') }, 4000) })
const list = [promise1, promise2, promise3, promise4, promise5];

const promiseFilter = (promiseList, passNum = 3) => {
    if (promiseList.length <= passNum) {
        Promise.all(promiseList).then((values) =>{
            console.log(values)
            console.log('promise list resolved')
        })
    } else {
        return new Promise((resolve, reject) => {
            let arr = []; // resolve data list
            let num = 0; // resolve time
            const processPrommise = (data) => {
                arr.push(data);
                num ++ ;
                if (num === passNum) {
                    console.log('promise list resolved arr', arr)
                    resolve(arr);
                }
            };

            for (let i = 0; i < promiseList.length; i++) {
                const element = promiseList[i];
                element.then((data) => processPrommise(data), reject)
            }
        });
    }
}
promiseFilter(list, 5)