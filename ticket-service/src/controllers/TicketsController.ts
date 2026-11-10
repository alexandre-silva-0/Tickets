import { Request, Response } from "express"

//interfaces
import { IAuthRequest } from "../dtos/users.dto.js"


//repository
import { createNewTicket } from "../repositories/TicketRepository.js"

export async function createTicket(req: IAuthRequest, res: Response) {

    const { title, description, userId } = req.body

    const ticket = {
        title, description, userId
    }

    try {
        const createdTicket = await createNewTicket(ticket)

        res.status(201).json({
            msg: `Seu ticket#${createdTicket.id} foi criado.`,
        })

        console.log(createdTicket)
    } catch (error) {
        console.error("Não foi possível registrar seu ticket.")
    }

}