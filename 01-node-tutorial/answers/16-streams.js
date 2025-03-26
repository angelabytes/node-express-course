const { createReadStream } = require('fs');

const stream = createReadStream('../content/big.txt', {
    highWaterMark: 200, 
    encoding: 'utf8' 
});

let counter = 0;

stream.on('data', (result) => {
    counter++;
    console.log(`Count ${counter}\n`, result);
});

stream.on('end', () => {
    console.log(`Total chunks received: ${counter}.\n`);
})

stream.on('error', (err) => console.log(`There's an error ${err}\n`));