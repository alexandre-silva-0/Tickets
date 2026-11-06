import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import { User } from '../models/User.js'

dotenv.config()

const sequelize = new Sequelize({
    database: process.env.DB_NAME!,
    dialect: "mysql",
    username: process.env.DB_USER!,
    password: process.env.DB_PSSWD!,
    host: process.env.DB_HOST!,
    port: 3307,
    models: [User]
})

const testConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log("Connection has been established successfully!")
    } catch (error) {
        console.error("Unable to connect to the database: ", error)
    }
}

testConnection()

export default sequelize