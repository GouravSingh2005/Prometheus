import express from "express";
import { middleware } from "./middleware";
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

app.listen(3000);