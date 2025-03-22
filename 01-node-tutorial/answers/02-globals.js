console.log(__dirname);
console.log(process.env.MY_VAR);
setTimeout(() => {
    console.log("There is a short wait before this will display.");
}, 2000)