function addString(num1, num2) {
    const numString1 = num1.toString();
    const numString2 = num2.toString();
    let key1 = numString1.length - 1
    let key2 = numString2.length - 1
    let flag = 0;
    let sum = ''
    while (key1 >= 0 || key2 >= 0) {
        const sub1 = key1 >= 0 ? Number(numString1[key1]) : 0
        const sub2 = key2 >= 0 ? Number(numString2[key2]) : 0
        const res = sub1 + sub2 + flag;
        flag = res >= 10 ? 1 : 0;
        sum = `${res % 10}${sum}`;
        key1 >= 0 && key1 --
        key2 >= 0 && key2 --
    }
    return sum
}

const result = addString(123, 456)
console.log('result', result)