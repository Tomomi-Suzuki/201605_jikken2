function debugShowLog(value) {
    if (DEBUG_MODE == true) {
        console.log(value)
    }
}

function arraySum(arr, fn) {
    if (fn) {
        return sum(arr.map(fn));
    }
    else {
        return arr.reduce(function (prev, current, i, arr) {
            return prev + current;
        });
    }
};