import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";

import { TagsRepositories } from "../repositories/TagsRepositories";


class ListTagsService{

    async execute(){
        const tagsRepositories = getCustomRepository(TagsRepositories);

        const tags = await tagsRepositories.find();

        return classToPlain(tags);//Goes inside the tag entitie and create the new objects
    }
}

export { ListTagsService }