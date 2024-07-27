function fetchWithRetry(url, retries) {
    return new Promise((resolve, reject) => {
        // function to handle retries
        const attemptFetch = (attemptsLeft) => {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    if (attemptsLeft <= 0) {
                        reject(`Failed after ${retries} retries: ${error.message}`);
                    } else {
                        console.log(`Retrying... Attempts left: ${attemptsLeft}`);
                        attemptFetch(attemptsLeft - 1);
                    }
                });
        };

        // first attempt
        attemptFetch(retries);
    });
}


const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=22.5411&longitude=88.3378&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=1';

fetchWithRetry(apiUrl, 3)
    .then(data => {
        console.log('Data fetched successfully:', data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
