import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";


export async function ensureAdmin(request: Request, response: Response, next: NextFunction){
    //Verify if the user its admin
    const { user_id } = request;

    const userRepositories = getCustomRepository(UsersRepositories);

    const {admin} = await userRepositories.findOne(user_id);

    //Verify if its an admin
    if(admin){
        return next();
    }

    return response.status(401).json({
        error: "Unauthorized user"
    });
}