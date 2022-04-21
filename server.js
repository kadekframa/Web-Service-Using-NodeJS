const http = require('http');
 
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
 
    response.statusCode = 200;

    const { url, method } = request;

    if(url === '/'){
        // todo 2
        if(method === 'GET'){
            response.end('Ini adalah homepage');
        }else{
            response.end(`Halaman tidak dapat diakses dengan ${request.method} request`);
        }

    }else if(url === '/about'){
        // todo 3
        if(method === 'GET'){
            response.end('Hallo! Ini adalah halaman about');
        }else if(method === 'POST'){
        let body = [];

        request.on('data', (chunk) => {
            body.push(chunk);
        });

        request.on('end', () => {
            body = Buffer.concat(body).toString();
            const { name } = JSON.parse(body);
            response.end(`Hallo, ${name}!`);
        });
        }else{
            response.end(`Halaman tidak dapat diakses dengan ${method} request`);
        }
    }else{
        // todo 1
        response.end('<h1>Halaman tidak ditemukan!</h1>');
    }
};

const server = http.createServer(requestListener);
 
const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});