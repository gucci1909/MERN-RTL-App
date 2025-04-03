import amqp from "amqplib";

let channel;
const QUEUE_NAME = "postQueue";

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log("Connected to RabbitMQ and queue is ready");
  } catch (error) {
    console.error("RabbitMQ Connection Error:", error);
  }
};

export const publishToQueue = async (message) => {
  if (!channel) {
    console.error("RabbitMQ channel is not initialized");
    return;
  }
  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
};
