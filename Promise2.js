
console.log("Program started");
const firstpromise = new Promise((resolve) => {
    console.log("Promise  abhi pending hai");
    setTimeout(() => {
        resolve("step 1 done")
    },3000);
});

console.log ("Program is in progrss");

firstpromise
 .then((value) => {
    console.log(value);
    return new Promise((resolve)=> {
        setTimeout(() => {
            resolve("Step 2 done")
        },3000)
    })
 })
 .then((value) => {
     console.log(value);
 })
 .catch((value) => {
    console.log(value);
 })