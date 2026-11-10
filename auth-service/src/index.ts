import express from 'express'
import cookieParser from 'cookie-parser'

//db connection
import database from './config/database.js'

//routes
import router from './routes/UserRoutes.js'


//RabbitMQ
import { connectRabbitMQ } from './config/rabbitmq.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(router)


const startServer = async () => {
    try {
        await connectRabbitMQ()
    } catch (error) {
        console.error("Não foi possível conectar ao RabbitMQ:", error)
    }

    database
        .sync()
        // .sync({force: true})
        .then(() => {
            app.listen(process.env.PORT)
            console.log('Listening on port ', process.env.PORT)
        })
}

startServer()