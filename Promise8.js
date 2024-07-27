function fetchAnyWithErrors(urls) {
    const fetchPromises = urls.map(url => 
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => ({
                success: true,
                data,
                url
            }))
            .catch(error => ({
                success: false,
                error: error.message,
                url
            }))
    );

    // Use Promise.any to get the first successful response or aggregate errors
    return new Promise((resolve, reject) => {
        Promise.any(fetchPromises)
            .then(result => {
                resolve(result.data);
            })
            .catch(() => {
                // Aggregate errors if all fetches failed
                const errorMessages = fetchPromises
                    .map(promise => promise.catch(error => error))
                    .map(p => p.error)
                    .filter(Boolean);

                reject(`All requests failed. Errors: ${errorMessages.join(', ')}`);
            });
    });
}


const apiUrls = [
    'https://api.open-meteo.com/v1/forecast?latitude=22.5411&longitude=88.3378&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=1',
    'https://fakestoreapi.com/products',
    'https://api.example.com/invalid' // Adding an invalid URL for demo
];

fetchAnyWithErrors(apiUrls)
    .then(data => {
        console.log('First successful response:', data);
    })
    .catch(error => {
        console.error('Error or all requests failed:', error);
    });
