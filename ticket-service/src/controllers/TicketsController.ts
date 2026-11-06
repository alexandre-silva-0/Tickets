import { Request, Response } from "express"

export async function createTicket(req: Request, res: Response) {
    res.status(200).json({ msg: "tickets funcionando" })
}