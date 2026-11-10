import express from 'express'
import dotenv from 'dotenv'
import ticketRouter from './routes/TicketsRoutes.js'
import commentRouter from './routes/CommentRoutes.js'

//config
import { connectRabbitMQ, consumeMessage } from './config/rabbitmq.js'
import database from './config/database.js'
import { registerNewUser } from './repositories/UserRepository.js'

const app = express()
dotenv.config()

app.use(express.json())

//routes
app.use(ticketRouter)
app.use(commentRouter)

const startServer = async () => {

    await connectRabbitMQ()
    consumeMessage('user_created', async (data) => {
        console.log(data)
        await registerNewUser(data)
    })

    await database
        .sync()
    // .sync({ force: true })

    app.listen(process.env.PORT)
    console.log("Listening on port", process.env.PORT)
}

startServer()