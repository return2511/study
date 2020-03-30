
function toThousands (num) {
    const arr = (num || 0).toString().split('');
    const result = [];
    let count = 0;
    for( let i = arr.length - 1; i >= 0 ; i --) {
        result.unshift(arr[i]);
        count ++;
        if (count % 3 === 0 && i > 0 ) {
            result.unshift(',');
        }
    }
    return result.join('');
}

console.log(toThousands(1234567890567890));

function toThousands1(num) {
    const str = (num || 0).toString();
    let result = '';
    let count = 0;
    for (let i = str.length - 1; i >= 0; i--){
        result = `${str.charAt(i)}${result}`;
        count ++;
        if (count % 3 === 0 && i > 0) {
            result = `,${result}`;
        }
    }
    return result;
}

console.log(toThousands1(1234567890567890));

function toThousands2(num) {
    var str = (num || 0).toString();
    var reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
    return str.replace(reg,"$1,");
}

console.log(toThousands2(12345678.90567890));