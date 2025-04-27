import type { Request,Response,NextFunction } from "express";

export function middleware(req:Request,res: Response,next:NextFunction){
    const startTime=Date.now();
    if (req.originalUrl === '/favicon.ico') {
        return next(); 
      }
    
    next();
    const endTime=Date.now();
    console.log(`Time taken is ${endTime-startTime} ms for method ${req.method} for route ${req.route?.path}`);
}