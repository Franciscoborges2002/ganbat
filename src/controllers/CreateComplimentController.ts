import { Request, Response } from "express"

import { CreateComplimentsService } from "../services/CreateComplimentsService"

class CreateComplimentController{
    async handle(request: Request, response: Response){
        const { user_id } = request;
        const { tag_id, user_sender, user_receiver, message } = request.body;
        console.log(user_id);

        const createComplimentService = new CreateComplimentsService();

        const compliment = await createComplimentService.execute({
            tag_id,
            user_sender: user_id,
            user_receiver,
            message
        });

        return response.json(compliment);
    }
}

export { CreateComplimentController }