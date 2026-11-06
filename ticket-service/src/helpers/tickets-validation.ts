import { body } from 'express-validator'


export const createTicketValidations = [
    body('title')
        .trim()
        .isEmpty().withMessage("O título é obrigatório."),
    body('description')
    
]