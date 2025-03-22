const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end('Welcome to our home page');
        return;
    }
   if (req.url === '/about') {
    res.end('About us/Our history');
    return;
   }

   res.end(
    `<h1>Oh no!</h1>
    <p>The page you're looking for doesn't seem to exist. </p>
    <a href="/">Home</a>
    `
   );
});


server.listen(3000);

