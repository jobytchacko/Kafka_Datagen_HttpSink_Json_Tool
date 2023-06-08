import { createInstance, deleteInstance, getIPAddress } from  './VM_Manager.js';
import {requests} from './Kafka_Request.js';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  

const questions = [
    'Create a VM',
    'Delete a VM',
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
  
  printNumberedQuestions(questions);
  
  
  rl.question('Enter the index of the numbered question: ', (answer) => {
    const index = parseInt(answer, 10);
  
    switch (index) {
        case 1:
           createInstance();
            break;
        case 2:
            deleteInstance();
            break;
        case 3:
            requests[0]
            break;
        case 4:
            request({ url: '/connectors' }).then((response) => {
                response.data.forEach((element) => {
                    request({ url: `/connectors/${element}`, method: 'delete' }).then(console.log(element + " : DELETED"));
                });
            });
            break;
        case 5:
            request({ url: '/connectors', data: pre_template, method: 'post' }).then((response) => console.log(response.data));
            break;
        case 6:
            request({ url: '/connector-plugins/DatagenConnector/config/validate', data: pre_template, method: 'put' }).then((response) => console.log(response.data));
        case 7:
            request({ url: '/connectors', data: file_schema, method: 'post' }).then((response) => console.log(response.data));
            break;
        case 8:
            adminClient.connect();
            adminClient.deleteTopic("Template_Schema", 10000, a => console.log("Template_Schema : NOT DELETED : " + a));
            adminClient.deleteTopic("Regex_Schema", a => console.log("Regex_Schema : NOT DELETED : " + a));
            adminClient.disconnect();
            break;
        default:
            console.log('Invalid index');
            break;
    }
  
    rl.close();
  });

  
