declare namespace Express{//To over write the package
    export interface Request{//Get all of the node_modules plus what we will add
        user_id: string;
    }
}