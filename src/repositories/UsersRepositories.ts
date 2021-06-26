import { EntityRepository, Repository} from "typeorm";
import { User } from "../entities/User";//To give to the entity repository the entity

@EntityRepository(User)//To the repository knows what entity we will work with
class UsersRepositories extends Repository<User>{//extend the Repository to have all the things to work

}

export { UsersRepositories };