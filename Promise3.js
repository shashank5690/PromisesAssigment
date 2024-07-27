console.log("Program started");

const myPromise = new Promise((resolve) => {
    console.log("Promise is pending...");

    setTimeout(() => {
        resolve({ data: "Hello, friend!", error: null });
    }, 5000);
});

console.log("Program in progress...");

myPromise
    .then((result) => {
        console.log("First promise resolved value:", result);
        //promise  fulfill hoga after 2 seconds
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("First promise chain complete!");
            }, 2000);
        });
    })
    .then((message) => {
        console.log(message);
    })
    .then(() => {
        //  second promise chain that is based on first promise
        return myPromise
            .then((result) => {
                console.log("Second promise resolved value:", result);
                //promise  fulfill hoga  after 10 seconds
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("Second promise chain complete!");
                    }, 10000);
                });
            });
    })
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
