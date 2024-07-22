const amqplib = require("amqplib");
const serverConfig = require("./serverConfig");
const { UserServices } = require("../services/index");

let channel, connection;

async function connectQueue() {
  try {
    connection = await amqplib.connect(serverConfig.MSG_QUEUE_URL);
    channel = await connection.createChannel();

    await channel.assertExchange(serverConfig.EXCHANGE_NAME, "direct", {
      durable: true,
    });
    console.log("============= Queue Connected");
  } catch (error) {
    console.log(error);
  }
}

async function sendData(data) {
  try {
    await channel.assertExchange(serverConfig.EXCHANGE_NAME, "direct", {
      durable: true,
    });
    await channel.assertQueue(serverConfig.QUEUE_NAME, { durable: true });
    await channel.bindQueue(
      serverConfig.QUEUE_NAME,
      serverConfig.EXCHANGE_NAME,
      "POST_USER"
    );

    channel.publish(
      serverConfig.EXCHANGE_NAME,
      "POST_USER",
      Buffer.from(JSON.stringify(data))
    );

    // setTimeout(() => {
    //   connection.close();
    // }, 500);
  } catch (error) {
    throw new Error(error);
  }
}

async function receiveData() {
  try {
    await channel.assertQueue(serverConfig.QUEUE_NAME, { durable: true });

    channel.consume(serverConfig.QUEUE_NAME, (msg) => {
      if (msg.content) {
        console.log("===============>", msg.content);
        UserServices.subscribeEvent(msg.content);
        channel.ack(msg);
      }
    });
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  connectQueue,
  sendData,
  receiveData,
};
