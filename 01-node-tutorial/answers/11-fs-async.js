const { readFile, writeFile, write } = require('fs');

console.log('start');

readFile('./content/first.txt', 'utf8', (err, result) => {
    if(err) {
        console.log(err)
        return;
    }
    const first = result;
    readFile('./content/second.txt', 'utf8', (err, result) => {
        if(err) {
            console.log(err)
            return;
        }
    const second = result;
    writeFile(
        './temporary/fileB.txt', 
        `Combining files: ${first}\n${second}\n`,
        {flag: 'a'},
        (err, result) => {
            if(err) {
                console.log(err);
                return;
            }
            console.log('done with this one');
            const third = 'This is the third line.';
            writeFile(
                './temporary/fileB.txt',
                `Finally: ${third} \n`,
                {flag: 'a'},
                (err, result) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                }
            )
        }
        
    ); 
        });
    
});
console.log('starting next one');
