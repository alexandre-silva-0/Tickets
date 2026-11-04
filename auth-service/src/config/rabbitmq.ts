import amqp from 'amqplib'

let channel: amqp.Channel //variavel para guardar o canal aberto e nao precisarmos recriar a cada requisicao

export const connectRabbitMQ = async (): Promise<void> => {
    try {
        const amqpServer = process.env.RABBITMQ_URL

        if (!amqpServer) throw new Error("URL do RabbitMQ não está definida no .env")

        //1. Conecta fisicamente ao container do RabbitMQ no home server
        const connection = await amqp.connect(amqpServer)

        //2. Abre um canal (as mensagens navegam por dentro)
        channel = await connection.createChannel()

        console.log("Conectado ao RabbitMQ com sucesso!")

    } catch (error) {
        console.error("Erro ao conectar no RabbitMQ: ", error)
    }
}

//Função que o controller vai chamar para disparar o evento
export const publishMessage = async (queueName: string, data: any): Promise<void> => {
    try {

        //garante que a queue existe. Se não existir, o rabbitmq cria na hora
        await channel.assertQueue(queueName, { durable: true })

        //converte o seu objeto para um buffer (formato binario) e envia para a fila
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)))

        console.log(`Evento enviado para a fila ${queueName}`)
    } catch (error) {
        console.error(`Erro ao enviar mensagem para fila ${queueName}: `, error)
    }
}
