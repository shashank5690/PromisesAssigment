function fetchWithRetry(url, maxTries) {
    return new Promise(async (resolve, reject) => {
        console.log("Fetching data from URL:", url);
        // let attempt = 1;

        for(let i=1;i<=maxTries;i++) {
            console.log("Try number:", i);
            try {
                const response = await fetch(url)
                const data = await response.json();
                return resolve(data);
            } catch (error) {
                   console.log(`Data not fetched after ${i}  attempts.`);
            }
        }
        reject('Data not fetched after multiple attempts.');
    });
}

const url = 'https://jsonpla4432ceholder.typicode.com/posts';
const url2 = 'https://jsonplaceholder.typicode.com/posts1';
fetchWithRetry(url, 3)
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });
