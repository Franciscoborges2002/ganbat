import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService{
    async execute({ name, email, admin = false, password }: IUserRequest){
        const usersRepository = getCustomRepository(UsersRepositories);

        if(!email){
            throw new Error("Incorrect email");
        }

        const userAlreadyExists = await usersRepository.findOne({email});

        if(userAlreadyExists){
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8);//Cryptograph the password

        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash//Field that i want: value to give to the field
        });

        await usersRepository.save(user);

        return user;
    }
};

export { CreateUserService };