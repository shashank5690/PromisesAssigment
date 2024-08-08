function fetchWithRace(urls, ms) {
    return Promise.race([
       ...urls.map(url => 
            fetch(url)
            .then(response => {
                if (!response.ok) {
                    console.log("Error fetching data:", response);
                }
                return response;
            })
            .catch(error => {
                console.log("API data not fetched:", error);
                throw error;
            })
        ),
        new Promise((reject) => 
            setTimeout(() => reject("Data not fetched within timeout"), ms)
        )
    ]);
}

const urls = [
    'https://api.open-meteo.com/v1/forecast?latitude=22.5411&longitude=88.3378&dmperat',
    'https://fakestoreapi.com',
];

fetchWithRace(urls, 5000)
    .then(results => {
        console.log('Data fetched successfully:', results);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });