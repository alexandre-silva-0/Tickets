import { Router } from "express";

//controller
import { createTicket } from "../controllers/TicketsController.js";

//helpers
import { createTicketValidations } from "../helpers/tickets-validation.js";
import { validate } from "../helpers/handle-validations.js";
import { checkToken } from "../helpers/jwt-helper.js";

const router = Router()


router.post('/api/tickets/createticket', checkToken, createTicketValidations, validate, createTicket)


export default router