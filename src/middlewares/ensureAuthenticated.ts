import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Ipayload{
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    
    //Receive the token
    const authToken = request.headers.authorization;

    //Validate if the token is fullfiled
    if(!authToken){
        return response.status(401).json({error: "The token is missing!"}).end();
    }
        //ignore the bearer, and give the token the var name token
    const [,token] = authToken.split(" ");

    

    try{
        //Check if the token is valid
        const { sub } = verify(token, "0e6aac290219fec35098969f86dc3b1b") as Ipayload;//Force the verify to have the interface IPayload

        //Recuperate information about user
        request.user_id = sub;//When i want to have the user id of the logged user in other stages


        return next();
    }catch(err){
        return response.status(401).json({error: "Unauthorized access"}).end();
    }
    
}