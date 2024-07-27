console.log("Program started");

const myPromise = new Promise((resolve, reject) => {
    console.log("Promise is pending...");
    
    setTimeout(() => {
        reject("Promise rejected!");
    }, 2000);

    setTimeout(() => {
        resolve("Promise resolved!");
    }, 3000);
});

console.log("Program in progress...");

myPromise
    .then((message) => {
        console.log(message);
        console.log("Program complete");
    })
    .catch((error) => {
        console.log(error);
        console.log("Program failure");
    });
