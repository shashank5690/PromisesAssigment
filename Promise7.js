function fetchWithRace(urls, timeout) {
    // Create an array of fetch promises
    const fetchPromises = urls.map(url => 
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
                }
                return response.json();
            })
    );

    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error('Request timed out'));
        }, timeout);
    });

    // Race between timeout and fetch promises
    return new Promise((resolve, reject) => {
        // Use Promise.race to get the first successful response or timeout
        Promise.race([...fetchPromises, timeoutPromise])
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Example usage with an array of URLs and a timeout value
const apiUrls = [
    'https://api.open-meteo.com/v1/forecast?latitude=22.5411&longitude=88.3378&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=1',
    'https://fakestoreapi.com/products'
];
const timeoutValue = 5000; // 5 seconds

fetchWithRace(apiUrls, timeoutValue)
    .then(result => {
        console.log('First successful response:', result);
    })
    .catch(error => {
        console.error('Error or timeout:', error);
    });
