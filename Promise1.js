
console.log("Program started");

const firstPromise  = new Promise((resolve,reject) => {
    console.log("Pending")

    setTimeout(() => {
        reject("rejcted")
    },6000);

    setTimeout(() => {
        resolve("resolved")
    },3000);
});

console.log("In progress")  
// promise is reject after 6sec so catch will be excuted
firstPromise
   .then((value)=>{
    console.log(value)
    console.log("Program complete")
   })

   .catch((error)=>{
    console.log(error)
    console.log("Program failure")
   });