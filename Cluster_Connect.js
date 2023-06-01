const { Kafka, logLevel } = require('kafkajs')
const propertiesReader = require('properties-reader');

const properties = propertiesReader('client.properties');


const host = properties.get('bootstrap.servers');
const username = properties.get('sasl.username');
const password = properties.get('sasl.password');
const mechanism = properties.get('sasl.mechanisms');
const topic = properties.get('topic');
const no_partitions = properties.get('partitions');
const { exec } = require("child_process");

exec("ls -la", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});




const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [`${host}:9092`],
  clientId: 'Consumer0',
  ssl: {  rejectUnauthorized: true  },
  sasl: { mechanism, username,  password }
})

const consumer = kafka.consumer({ groupId: 'test-group1' })

const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })
  await consumer.run({
    
      
      eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
        console.log(`- ${prefix} ${message.key}#${message.value}`)
        await new Promise(resolve => setTimeout(resolve, 30))
      },
    })
    
    
    // manully reset offset to 0
    const partitions = [...Array(no_partitions).keys()]
    partitions.forEach( partition => { consumer.seek({ topic, partition, offset : 0 }) })
}

run().catch(e => console.error(` ${e.message}`, e))

const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

errorTypes.forEach(type => {
  process.on(type, async e => {
    try {
      console.log(`process.on ${type}`)
      console.error(e)
      await consumer.disconnect()
      process.exit(0)
    } catch (_) {
      process.exit(1)
    }
  })
})

signalTraps.forEach(type => {
  process.once(type, async () => {
    try {
      await consumer.disconnect()
    } finally {
      process.kill(process.pid, type)
    }
  })
})