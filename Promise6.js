function fetchAllWithErrors(urls) {
    return Promise.all(
         urls.map(async url => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    console.log("response.status =", response.status);
                }
                return response;
            }
            catch (error) {
                return Promise.reject(error);
            }
     })
    );
}

const urls = [
    'https://api.open-meteo.com/v1/forecast?latitude=22.5411&longitude=88.3378&dmperat',
    'https://fakestoreapi.c'
];

fetchAllWithErrors(urls)
    .then(results => {
        console.log('data fetched successfully:', results);
    })
    .catch(error => {
        console.error('error fetching data:', error);
    });
