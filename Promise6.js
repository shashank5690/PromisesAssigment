function fetchAllWithErrors(urls) {
    const fetchPromises = urls.map(url => 
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
                }
                return response.json();
            })
    );

    return new Promise((resolve, reject) => {
        Promise.all(fetchPromises)
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}


const apiUrls = [
    'https://api.open-meteo.com/v1/forecast?latitude=22.5411&longitude=88.3378&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=1',
    'https://fakestoreapi.com/products'
];

fetchAllWithErrors(apiUrls)
    .then(results => {
        console.log('All data fetched successfully:', results);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
