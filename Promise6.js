function fetchAllWithErrors(urls) {
    // const res = [];
    return Promise.all(
         urls.map(url => 
            fetch(url)
            .then( response => {
                // const response = await fetch(url);
                if(!response.ok){
                    console.log("Error fetching data:",response)
                }
                return response;
            })
            .catch (error =>{
                // console.log("Error fetching data:",error)
                //reject with error
                return Promise.reject(error);   
          })
    )
);
}

const urls = [
    'https://api.op55en-meteo.com/v1/forecast?latitude=22.5411&longitude=88.3378&dmperat',
    'https://fakesto555reapi.c'
];

fetchAllWithErrors(urls)
    .then(results => {
        console.log('data fetched successfully:', results);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
