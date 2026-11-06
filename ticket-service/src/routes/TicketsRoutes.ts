import { Router } from "express";

import { createTicket } from "../controllers/TicketsController";

const router = Router()


router.post('/api/tickets/createticket', createTicket)


export default router