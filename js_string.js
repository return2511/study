
const str = 'x'.repeat(2);
console.log(str);


String.prototype.myRepeat = function(n) {
    const str = this.toString();
    if (n < 0) return console.error(new Error('Invalid number value'));
    const num = Math.floor(n) || 0;
    const arr = new Array(num + 1);
    return arr.join(str) || '';
}

const str2 = 'xyz'.myRepeat(2);
console.log(str2);


const start = + new Date();
console.log(start);
while(+ new Date() - start < 10) ;
setTimeout(() => {
    console.log('time out')
}, 0);

setImmediate(() => {
    console.log('set immediate')
});