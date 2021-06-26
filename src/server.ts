import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import { router } from "./routes";

import "./database";

const PORT = 3000;//Easly change the port of all server
const app = express();

app.use(express.json());
app.use(router);

//Midleware of exceptions
app.use((err: Error, request: Request, response: Response, next: NextFunction) =>{
    if(err instanceof Error){//Send the erros that we handled
        return response.status(400).json({
            error: err.message
        });
    }

    //Send the erros that i dont have handled
    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
});


app.listen(PORT, () => {
    console.log("Server is running in port " + PORT);
});