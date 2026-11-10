import { Response } from "express";
import { IAuthRequest } from "../dtos/users.dto.js";


export async function createComment(req: IAuthRequest, res: Response) {

    const { content } = req.body
    const { ticketId } = req.params

    const comment = {
        content,
        ticketId,
        userId: req.user!.id
    }

    

}