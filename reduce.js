[1,2,3,4,5].reduce((pre,next,index,arr)=>{
    console.log('index', index)
    console.log('arr', arr)
    console.log(pre+next)
    return pre+next;
})