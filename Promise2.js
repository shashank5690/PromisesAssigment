console.log("Program started");

const firstPromise = new Promise((resolve) => {
    console.log("Promise is pending...");
    
    setTimeout(() => {
        resolve("Step 1 complete");
    }, 3000);
});

console.log("Program in progress...");

firstPromise
    .then((message) => {
        console.log(message);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Step 2 Complete");
            }, 3000);
        });
    })
    .then((message) => {
        console.log(message);
    });
