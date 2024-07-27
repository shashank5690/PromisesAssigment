function conditionalChaining(initialUrl, secondaryUrl1, secondaryUrl2) {
    return fetch(initialUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch from ${initialUrl}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Example condition: fetch the second URL if data meets some condition
            const shouldFetchSecondary1 = data.someCondition; // Replace with actual condition

            const secondaryUrlToFetch = shouldFetchSecondary1 ? secondaryUrl1 : secondaryUrl2;

            return fetch(secondaryUrlToFetch)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch from ${secondaryUrlToFetch}: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(secondaryData => ({
                    initialData: data,
                    secondaryData
                }));
        });
}

// Example usage
const initialUrl = 'https://api.example.com/initial';
const secondaryUrl1 = 'https://api.example.com/secondary1';
const secondaryUrl2 = 'https://api.example.com/secondary2';

conditionalChaining(initialUrl, secondaryUrl1, secondaryUrl2)
    .then(result => {
        console.log('Results:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
