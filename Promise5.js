function fetchWithTimeout(url, timeout) {
    return new Promise((resolve, reject) => {

        const timeoutPromise = new Promise((_, rejectTimeout) => {
            setTimeout(() => {
                rejectTimeout(new Error('Request timed out'));
            }, timeout);
        });

      
        const fetchPromise = fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });

        // Race between fetch and timeout
        Promise.race([fetchPromise, timeoutPromise])
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}


// for 5 seconds timeout , as data will be fectched in 2 sec so 
// it will not throw error, if we do 1 sec then Promise.race humko error dega
// as data will not be fetched in 1 sec/or humara timeout ho jayega
// ya api galat response degi toh bhi error dega
// in present care we are using 5 sec so it will not throw error
const apiUrl = 'https://fakestoreapi.com/products';
const timeoutValue = 5000; 

fetchWithTimeout(apiUrl, timeoutValue)
    .then(data => {
        console.log('Data fetched successfully:', data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
