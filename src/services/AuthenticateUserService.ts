import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService{

    async execute({email, password}: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);

        //Verify if the email exists
        const user = await usersRepositories.findOne({email});

        if(!user){
            throw new Error("Email/Password incorrect");
        }

        //Verify if the password its right
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("Email/Password incorrect");
        }
        
        //Generate the token
        const token = sign({
            email: user.email                       //Our payload from jwt
        }, "0e6aac290219fec35098969f86dc3b1b", {    //The secret private key
            subject: user.id,                       //options
            expiresIn: "1d"                         //The expiresIn we can use the refreshToken (< Duration, > RefreshTOken)
        });                                         //1d = 1 day

        return token;
    }
}

export { AuthenticateUserService };