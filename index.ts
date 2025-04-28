import express from "express";

import type { Request,Response,NextFunction } from "express";
import client from "prom-client";

const requestCounter=new client.Counter({
    name: 'http_request_total',
    help : 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});
function middleware(req:Request,res: Response,next:NextFunction){
    const startTime=Date.now();

    res.on('finish',()=>{
        const endTime=Date.now();
        console.log(`Request Took ${endTime-startTime}ms`)
        requestCounter.inc({
            method:req.method,
            route:req.route? req.route.path:req.path,
            status_code:res.statusCode
        });
    });
    next();
};
const app=express();
app.use(middleware);

app.get("/cpu",(req,res)=>{
    
for(let i=0;i<100000;i++){
    Math.random();
}
res.json({
    message:"cpu"
})

})
app.get("/users",(req,res)=>{
    res.json({
        message:"user"
    })
})
app.get("/metrics", async (req, res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
})

app.listen(3000);