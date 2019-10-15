const fs=require('fs');
const http=require('http');
const url=require('url');
const port=9000;
const repalceTemplate=require('./modules/replaceTemplate');

////////SERVER STARTS HERE

const tempOverview=fs.readFileSync(`${__dirname}/src/template-overview.html`,'utf-8');
const tempCard=fs.readFileSync(`${__dirname}/src/template-card.html`,'utf-8');
const tempProduct=fs.readFileSync(`${__dirname}/src/template-product.html`,'utf-8');
const data=fs.readFileSync(`${__dirname}/json/data.json`,'utf-8');
const dataObj=JSON.parse(data);
 
const server=http.createServer((req,res)=>{
    const {query,pathname}=url.parse(req.url,true);

    ////////OVERVIEW
    if(pathname==='/' || pathname==='/overview'){
        res.writeHead(200,{'Content-type':'text/html'});
        const cardsHtml=dataObj.map(el=>repalceTemplate(tempCard,el)).join('');
        const output=tempOverview.replace('  {%PRODUCT_CARDS%}',cardsHtml);

        // console.log(cardsHtml);
        res.end(output);

    //////PRODUCT PAGE
    } else if(pathname==='/product'){
        res.writeHead(200,{'Content-type':'text/html'}); 
        const product=dataObj[query.id];
        const output=repalceTemplate(tempProduct,product);
        // res.end(tempProduct);
        res.end(output);
    }
    ////API
    else if(pathname==='/api'){
            res.writeHead(200,{'Content-type':'application/json'});
            res.end(data);
            console.log(dataObj);
    
    ////NOT FOUND
       
    }
    else{
        res.writeHead(404,{
            'Content-type':'text/html',
        });
        res.end('<h2>404!</h2></br><h1>Page not found!!!</h1>');
    }

    
});
// server.listen(port);
server.listen(port,'127.0.0.1',()=>{
    console.log('Lisenting to request on port 9000');
}); 