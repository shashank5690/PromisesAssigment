console.log("program started");

const PromiseHello1 = () => new Promise((resolve,reject) => {
    console.log("Program is in Progress");
    
    setTimeout(( ) => {
            resolve({data: "Hello, friend!", error: null});
    },5000)

    console.log("promise is Pending");
    
});
 
  const Promisehellochain1 = () => new Promise ((resolve,reject) => {   
        setTimeout(() => {
            resolve("First Promise chain complete!");
        },2000)
  });

  const Promisehellochain2 = () => new Promise ((resolve,reject) => {
        setTimeout(() => {
            resolve("Second Promise chain complete!");
        },10000)
  });


PromiseHello1()
    .then((res)=> {
        console.log(res);
        return Promisehellochain1()
    })
    .then((res) => {
        console.log (res);
        return Promisehellochain2()
    })
    .then((res) => console.log(res))
    .catch(error=> console.log(error));
