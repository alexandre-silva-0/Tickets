import amqp from 'amqplib'

let channel: amqp.Channel

export const connectRabbitMQ = async (): Promise<void> => {
    try {

        const amqpServer = process.env.RABBITMQ_URL
        if (!amqpServer) throw new Error("URL do RabbitMQ não está definida no .env")

        const connection = await amqp.connect(amqpServer)
        channel = await connection.createChannel()

        console.log('RabbitMQ conectado com sucesso!')
    } catch (error) {
        console.error('Erro ao conectar no RabbitMQ: ', error)
    }
}

export const consumeMessage = async (queueName: string, callback: (data: any) => void): Promise<void> => {
    try {

        await channel.assertQueue(queueName, { durable: true })

        console.log('Aguardando eventos na fila ')

        channel.consume(queueName, (msg) => {
            if (msg !== null) {
                const data = JSON.parse(msg.content.toString())

                callback(data)

                channel.ack(msg)
            }
        })

    } catch (error) {
        console.error(`Erro ao consumir fila ${queueName}: ${error}`)
    }
}