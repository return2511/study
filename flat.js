// question2: 数组扁平化
// 我这边思路是使用递归，如果数组的item还是数组形式，就继续递归调用
// [1, [2, 3], [4, 5, 6, [7, 8]]] -> [1, 2, 3, 4, 5, 6, 7, 8]
function flat(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        Array.isArray(element) ? res = [...res, ...flat(element)] : res.push(element);
    }
    return res;
}

const list = [1, [2, 3], [4, 5, 6, [7, 8]]]
console.log(flat(list));