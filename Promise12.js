function fetchWithExponentialBackoff(url, maxRetries, delay = 1000) {
    const attemptFetch = (retriesLeft, currentDelay) => {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
                }
                return response.json();
            })
            .catch(error => {
                if (retriesLeft <= 0) {
                    throw new Error(`Failed after ${maxRetries} retries: ${error.message}`);
                }
                return new Promise(resolve => setTimeout(resolve, currentDelay))
                    .then(() => attemptFetch(retriesLeft - 1, currentDelay * 2));
            });
    };

    return attemptFetch(maxRetries, delay);
}

// Example usage
const apiUrl = 'https://api.example.com/data';
const maxRetries = 3;

fetchWithExponentialBackoff(apiUrl, maxRetries)
    .then(data => {
        console.log('Data fetched successfully:', data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
