function fetchSequentially(urls) {
    const results = [];

    const fetchNext = (index) => {
        if (index >= urls.length) {
            return Promise.resolve(results);
        }

        return fetch(urls[index])
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch from ${urls[index]}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                results.push(data);
                return fetchNext(index + 1);
            });
    };

    return fetchNext(0);
}

// Example usage
const apiUrls = [
    'https://api.open-meteo.com/v1/forecast?latitude=22.5411&longitude=88.3378&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=1',
    'https://fakestoreapi.com/products'
];

fetchSequentially(apiUrls)
    .then(results => {
        console.log('Sequential results:', results);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
