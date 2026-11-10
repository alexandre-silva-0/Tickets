import { body } from 'express-validator'
import { getUserById } from '../repositories/UserRepository.js'


export const createTicketValidations = [
    body('title')
        .trim()
        .isEmpty().withMessage("O título é obrigatório."),
    body('description')
        .trim().isEmpty().withMessage("A descrição é obrigatória")
        .isLength({ min: 15 }).withMessage('A descrição deve ter no mínimo 15 caractéres'),
    body('userId')
        .isEmpty().withMessage("O id do usuário é obrigatório.")
        .custom(async (value) => {
            const user = await getUserById(value)
            if (!user) throw new Error("Usuário não existe")

            return
        })

]