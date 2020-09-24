
// adding 'async' before the function makes it return a Promise
async function myFunc() {
    return 'hello';
}

console.log(myFunc());
// output:
// Promise {<fulfilled>: "hello"}

myFunc()
    .then(res => console.log(res));
    // output:
    // hello


    