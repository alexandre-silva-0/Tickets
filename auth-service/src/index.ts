import express from 'express'
import cookieParser from 'cookie-parser'

//db connection
import conn from './db/conn.js'

//routes
import router from './routes/UserRoutes.js'
import { connectRabbitMQ } from './config/rabbitmq.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(router)

connectRabbitMQ()

conn
    .sync()
    // .sync({ force: true })
    .then(() => {
        app.listen(process.env.PORT)
        console.log('Listening on port', process.env.PORT)
    }).catch(
        (error) => console.error('Unable to run app: ', error)
    )
