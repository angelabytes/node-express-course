const { readFileSync, writeFileSync, write } = require('fs');
const first = readFileSync('./content/first.txt', 'utf-8');
const second = readFileSync('./content/second.txt', 'utf-8');

console.log(first, second);

writeFileSync('./temporary/fileA.txt',
    `First : ${first} \n`,
    {flag: 'a'}
);

writeFileSync('./temporary/fileA.txt',
    `Next...${second} \n`,
    {flag: 'a'}
);

writeFileSync('./temporary/fileA.txt',
    'This is the last one. \n',
    {flag: 'a'}
);