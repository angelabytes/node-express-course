const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
    const first = await readFile('./content/first.txt', 'utf-8');
    const second = await readFile('./content/second.txt', 'utf-8');

    try {
        await writeFile('temp.txt', `First : ${first}\n`);
        await writeFile('temp.txt', `Next...${second}\n`, {flag: 'a'});
        await writeFile('temp.txt', 'This is the last one. \n', {flag: 'a'});

        console.log("Successfully wrote three lines to the file.");
    } catch (err) {
        console.log("Could not write to the file: ", err)
    }
    
}

const reader = async () => {
    try {
        const result = await readFile('temp.txt', 'utf-8');
        console.log('Reading file: \n', result);
    } catch(err) {
        console.log("Could not read the file:", err)
    }
}

const readWrite = async() => {
    await writer();
    await reader();
}

readWrite();
