const fs=require('fs');
const http=require('http');
const url=require('url');
const port=9000;

////////SERVER STARTS HERE
const repalceTemplate=(temp,product)=>{
    let output=temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output=output.replace(/{%IMAGE%}/g,product.image);
    output=output.replace(/{%PRICE%}/g,product.price);
    output=output.replace(/{%FROM%}/g,product.from);
    output=output.replace(/{%NUTRIENTS%}/g,product.nutrients);
    output=output.replace(/{%QUANTITY%}/g,product.quantity);
    output=output.replace(/{%DESCRIPTION%}/g,product.description);
    output=output.replace(/{%ID%}/g,product.id);
    if(!product.organic) output=output.replace(/{%NOT_ORGANIC%}/g,'not_organic');
    return output;
}
const tempOverview=fs.readFileSync(`${__dirname}/src/template-overview.html`,'utf-8');
const tempCard=fs.readFileSync(`${__dirname}/src/template-card.html`,'utf-8');
const tempProduct=fs.readFileSync(`${__dirname}/src/template-product.html`,'utf-8');
const data=fs.readFileSync(`${__dirname}/js/data.json`,'utf-8');
const dataObj=JSON.parse(data);
 
const server=http.createServer((req,res)=>{
    const pathName=req.url;

    ////////OVERVIEW
    if(pathName==='/' || pathName==='/overview'){
        res.writeHead(200,{'Content-type':'text/html'});
        const cardsHtml=dataObj.map(el=>repalceTemplate(tempCard,el)).join('');
        const output=tempOverview.replace('  {%PRODUCT_CARDS%}',cardsHtml);

        // console.log(cardsHtml);
        res.end(output);

    //////PRODUCT PAGE
    } else if(pathName==='/product'){
        res.writeHead(200,{'Content-type':'text/html'});
        res.end(tempProduct);
    }
    ////API
    else if(pathName==='/api'){
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