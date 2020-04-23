function clone(target) {
    if (target && typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        for (const key in target) {
            cloneTarget[key] = clone(target[key]);
        }
        return cloneTarget;
    } else {
        return target;
    }
};

const obj = {
    a: 112,
    b: '2222',
    c: [1,2,3,5],
    d: {
        aa: 123,
        bb: {
            cc: 'hahahha'
        }
    }
}

const obj2 = clone(obj);
console.log('object', obj2)
obj.a = 2;
obj.d.aa = 123123123;
console.log('object', obj)
console.log('object2', obj2)