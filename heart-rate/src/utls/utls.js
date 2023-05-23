

// 节流（n秒内只下执行一次）
const throttle = (fn, delay = 500) => {
    let flag = false;
    return function(...args) {
        if (!flag) {
            flag = true;
            setTimeout(() => {
                console.log(flag);
                flag = false;
                // @ts-ignore
                fn.apply(this, args);
            }, delay);
        }
    };
};


export {
    throttle
}
