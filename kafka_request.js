import gaxios, { request } from 'gaxios';
import Kafka from 'node-rdkafka';
import readline from 'readline';

const adminClient = Kafka.AdminClient.create({
  'client.id': 'kafka-admin',
  'metadata.broker.list': '104.197.189.100:9101',
  'socket.timeout.ms': 5000, 
});



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



const kafkaRestBaseUrl = 'http://104.197.189.100:8082';

gaxios.instance.defaults = {
  baseURL: 'http://104.197.189.100:8083',
  headers: {
    'Content-Type': 'application/json',
    'Accept': ['application/json', 'json']
  }
}

let pre_template = JSON.stringify({
  "name": "Datagen_pre_template",
  "config": {
    "connector.class": "io.confluent.kafka.connect.datagen.DatagenConnector",
    "name": "Datagen_pre_template",
    "schema.string": "{\"connect.name\":\"lithin.personal.ust_data\",\"fields\":[{\"name\":\"Name\",\"type\":{\"type\":\"string\",\"arg.properties\":{\"regex\":\"User_[1-9]{0,1}\"}}},{\"name\":\"office\",\"type\":\"string\"},{\"name\":\"user_id\",\"type\":\"string\"},{\"name\":\"employee_id\",\"type\":\"long\"},{\"name\":\"cubicle_num\",\"type\":\"int\"}],\"name\":\"ust_data\",\"namespace\":\"lithin.personal\",\"type\":\"record\"}",
    "tasks.max": "1",
    "kafka.topic": "Template_Schema"
  }
});

let file_schema = JSON.stringify({
  "name": "Datagen_file_schema",
  "config": {
    "connector.class": "io.confluent.kafka.connect.datagen.DatagenConnector",
    "name": "Datagen_file_schema",
    "schema.string": "{\"connect.name\":\"lithin.personal.ust_data\",\"name\":\"ust_data\",\"namespace\":\"lithin.personal\",\"type\":\"record\",\"fields\":[{\"name\":\"store_id\",\"type\":{\"type\":\"int\",\"arg.properties\":{\"range\":{\"min\":1,\"max\":100}}}},{\"name\":\"order_lines\",\"type\":{\"type\":\"array\",\"items\":{\"name\":\"order_line\",\"type\":\"record\",\"fields\":[{\"name\":\"product_id\",\"type\":{\"type\":\"int\",\"arg.properties\":{\"range\":{\"min\":1,\"max\":100}}}},{\"name\":\"category\",\"type\":{\"type\":\"string\",\"arg.properties\":{\"regex\":\"User_[1-9]{0,1}\"}}},{\"name\":\"quantity\",\"type\":{\"type\":\"int\",\"arg.properties\":{\"range\":{\"min\":1,\"max\":100}}}},{\"name\":\"unit_price\",\"type\":{\"type\":\"float\",\"arg.properties\":{\"range\":{\"min\":0.1,\"max\":10}}}},{\"name\":\"net_price\",\"type\":{\"type\":\"float\",\"arg.properties\":{\"range\":{\"min\":0.1,\"max\":10}}}}]},\"arg.properties\":{\"length\":{\"min\":1,\"max\":5}}}}]}",
    "tasks.max": "1",
    "kafka.topic": "Regex_Schema"
  }
});



// Define an array of questions
const questions = [
  'Get a list of all connector plugins',
  'Delete all the connector',
  'Create a connector based on template',
  'Validate a connector config',
  'Create a connector based on Regex Avro',
  'Delete all the topics'
];

// Function to print numbered questions
function printNumberedQuestions(questions) {
  questions.forEach((question, index) => {
    const questionNumber = index + 1;
    console.log(`${questionNumber}. ${question}`);
  });
}

// Call the function to print the numbered questions
printNumberedQuestions(questions);


rl.question('Enter the index of the numbered question: ', (answer) => {
  const index = parseInt(answer, 10);

  switch (index) {
    case 1:
      request({ url: '/connector-plugins' }).then((response) => console.log(response.data));
      break;
    case 2:
      request({ url: '/connectors' }).then((response) => {
        response.data.forEach((element) => {
          request({ url: `/connectors/${element}`, method: 'delete' }).then(console.log(element+ " : DELETED"));
        });
      });
      break;
    case 3:
      request({ url: '/connectors', data: pre_template, method: 'post' }).then((response) => console.log(response.data));
      break;
    case 4:
      request({ url: '/connector-plugins/DatagenConnector/config/validate', data: pre_template, method: 'put' }).then((response) => console.log(response.data));
    case 5:
      request({ url: '/connectors', data: file_schema, method: 'post' }).then((response) => console.log(response.data));
      break;
    case 6:
      adminClient.connect();
      adminClient.deleteTopic("Template_Schema", 10000, a => console.log("Template_Schema : NOT DELETED : "+a))   ;
      adminClient.deleteTopic("Regex_Schema", a => console.log("Regex_Schema : NOT DELETED : "+a))   ;
      adminClient.disconnect();
      break;
    default:
      console.log('Invalid index');
      break;
  }

  rl.close();
});









