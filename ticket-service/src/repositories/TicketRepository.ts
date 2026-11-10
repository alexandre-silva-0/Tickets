import { Ticket } from "../models/Ticket.js";

//interfaces
import { ITicketCreation } from "../dtos/tickets.dto.js";

export const createNewTicket = async (ticket: ITicketCreation) => {
    return await Ticket.create({
        title: ticket.title,
        description: ticket.description,
        userId: ticket.userId
    })

}

export const getTicketByID = async (ticketId: number) => {
    return await Ticket.findOne({ where: { id: ticketId } })
}