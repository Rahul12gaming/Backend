
const http=require("http");
const fs=require("fs");
const server=http.createServer((req,res)=>{
    console.log("request from client"); 
    // console.log(req.method);
    // console.log(req.url);
    // res.setHeader('Content-Type','text/Html');
    // res.write("<h1>Hello Bhai log</h1>");
    // res.end();
    let path="./views";
    switch(req.url){
        case '/':
            path+="/index.html";
            res.statusCode=200;
            break;
        case '/about':
            path+="/about.html";
            res.statusCode=200;
            break;
        case '/about-me':
            res.statusCode=300;
            res.setHeader("Location","/about");
            res.end();
            break;
        default:
            path+="/error.html";
            res.statusCode=404;
            break;
    }
    fs.readFile(path,(err,file)=>
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.write(file);
            res.end();
        }
    })
    
})
server.listen(3000,()=>{
    console.log("server is runnig");
})