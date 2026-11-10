import { body, param } from "express-validator";

//repositories
import { getTicketByID } from "../repositories/TicketRepository.js";
import { getUserById } from "../repositories/UserRepository.js";


export const createCommentValidations = [
    body('content')
        .trim().notEmpty().withMessage('Não é possível publicar um comentário vazio.'),

    param("ticketId")
        .isEmpty().withMessage("O id do ticket é obrigatório.")
        .custom(async (value) => {
            const ticket = await getTicketByID(value)

            if (!ticket) throw new Error("Não foi possível criar comentário, o ticket é inválido.")

            return
        }),
]