const { writeFile, readFile } = require("fs").promises;

writeFile('temp.txt', 'ʻO wai kou inoa\n')
    .then(() => {
        return writeFile('temp.txt', 'ʻO Haunani inoa. \n', {flag: 'a'});
    })
    .then(() => {
        return writeFile('temp.txt', 'Hauʻoli kēia hui ʻana o kāua \n', {flag: 'a'});
    })
    .then(() => {
        return readFile('temp.txt', 'utf-8');
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log("An error occurred: ", error);
    })

