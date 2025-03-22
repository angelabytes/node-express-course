const path = require('path');

console.log(path.sep);

const filePath = path.join('/content/', '/subfolder', 'test.txt');
console.log(filepath);

//returns just the base name from the path
const baseName = path.basename(filePath);
console.log(baseName);

const absolutePath  = path.resolve(__dirname, 'content', 'subfolder', 'test.txt');
console.log(absolutePath);