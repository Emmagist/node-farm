const fs = require('fs');
const http = require('http');
const url = require('url');

//import replacetemplate module
const replaceTemplate = require('./modules/replaceTemplate');

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
// console.log(textIn);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
    const dataObject = JSON.parse(data);

// Server
const server = http.createServer((req, res) =>{
    const {query, pathname} = url.parse(req.url, true);

    // Overview Page
    if (pathname === '/' || pathname === '/overview') {

        res.writeHead( 200, {
            'content-type': 'text/html'
        } );

        const cardsHtml = dataObject.map(el => replaceTemplate(tempCard, el)).join('');

        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
        res.end(output);

        // Product Page
    }else if (pathname === '/product') {
        res.writeHead( 200, {
            'content-type': 'text/html'
        } );

        const product = dataObject[query.id];
        const output = replaceTemplate(tempProduct, product);

        res.end(output);

        // API Page
    }else if (pathname === '/api') {
        res.writeHead( 200, {
            'content-type': 'application/json'
        } );
        res.end(data);

        // 404 Page
    }else{
        res.writeHead( 404, {
            'content-type': 'text/html',
            'my-own-header': 'hello world'
        } );
        res.end('<h1>Page not found</h1>');
    }
});

server.listen(8000, '127.0.0.1', () =>{
    console.log('Listing to requests on port 8000');
})