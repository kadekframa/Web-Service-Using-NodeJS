const http = require('http');
 
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    // response.setHeader('X-Powered-By', 'NodeJS');

    const { url, method } = request;

    if(url === '/'){
        // todo 2
        if(method === 'GET'){
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Ini adalah homepage',
            }));
        }else{
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${request.method} request`,
            }));
        }

    }else if(url === '/about'){
        // todo 3
        if(method === 'GET'){
            
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Hallo! Ini adalah halaman about',
            }));
        }else if(method === 'POST'){
        let body = [];

        request.on('data', (chunk) => {
            body.push(chunk);
        });

        request.on('end', () => {
            body = Buffer.concat(body).toString();
            const { name } = JSON.parse(body);
            
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: `Hallo, ${name}!`,
            }));
        });
        }else{
            
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`,
            }));
        }
    }else{
        // todo 1
        
        response.statusCode = 404;
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan!',
        }));
    }
};

const server = http.createServer(requestListener);
 
const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});