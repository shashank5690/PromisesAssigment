function fetchWithFallback(urls) {
    const results = [];
    const errors = [];

    const fetchUrl = (url) => {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                results.push(data);
            })
            .catch(error => {
                errors.push(error.message);
            });
    };

    const fetchAll = urls.map(fetchUrl);

    return Promise.all(fetchAll)
        .then(() => {
            if (results.length === 0) {
                throw new Error(`All requests failed. Errors: ${errors.join(', ')}`);
            }
            return results;
        });
}

// Example usage
const apiUrls = [
    'https://api.open-meteo.com/v1/forecast?latitude=22.5411&longitude=88.3378&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=1',
    'https://fakestoreapi.com/products',
    'https://api.example.com/invalid' // Adding an invalid URL for demonstration
];

fetchWithFallback(apiUrls)
    .then(results => {
        console.log('Successful results:', results);
    })
    .catch(error => {
        console.error('Error:', error);
    });
