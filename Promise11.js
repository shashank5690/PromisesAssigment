function batchFetch(urls, batchSize) {
    const results = [];

    const fetchBatch = (batchUrls) => {
        const batchPromises = batchUrls.map(url =>
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
                    }
                    return response.json();
                })
                .catch(error => ({ error: error.message }))
        );

        return Promise.all(batchPromises)
            .then(batchResults => {
                results.push(...batchResults);
            });
    };

    const processBatches = (index) => {
        if (index >= urls.length) {
            return Promise.resolve(results);
        }

        const batchUrls = urls.slice(index, index + batchSize);
        return fetchBatch(batchUrls).then(() => processBatches(index + batchSize));
    };

    return processBatches(0);
}

// Example usage
const apiUrls = [
    'https://api.open-meteo.com/v1/forecast?latitude=22.5411&longitude=88.3378&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=1',
    'https://fakestoreapi.com/products',
    'https://api.example.com/another',
    'https://api.example.com/yet-another'
];
const batchSize = 2;

batchFetch(apiUrls, batchSize)
    .then(results => {
        console.log('Batch results:', results);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
