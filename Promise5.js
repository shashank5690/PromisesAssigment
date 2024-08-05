function fetchwithTimeout(url,time) {
    return new Promise(async(resolve,reject) => {
        console.log("Fetching the data data fro url:",url);

        //settimeout]
        setTimeout(() => {
            resolve("Data fetched successfully");
        },4000);
        setTimeout(() => {
            reject("Data not fetched after multiple attempts");
        },time);
    })
}

const url = 'https://jsonplaceholder.typicode.com/posts';
fetchwithTimeout(url,3000)
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });