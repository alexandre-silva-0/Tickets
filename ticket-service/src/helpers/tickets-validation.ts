import { body } from 'express-validator'
import { getUserById } from '../repositories/UserRepository.js'


export const createTicketValidations = [
    body('title')
        .trim()
        .notEmpty().withMessage("O título é obrigatório."),
    body('description')
        .trim().notEmpty().withMessage("A descrição é obrigatória")
        .isLength({ min: 15 }).withMessage('A descrição deve ter no mínimo 15 caractéres'),

]