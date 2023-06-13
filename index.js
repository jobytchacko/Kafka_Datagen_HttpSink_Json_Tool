import { createInstance, deleteInstance, getIPAddress } from  './VM_Manager.js';
import {requests} from './Kafka_Request.js';
import readline from 'readline';
import { stdin as input, stdout as output } from 'node:process';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  

const questions = [
    'Create a VM',
    'Get a list of all connector plugins',
    'Create a connector based on template',
    'Create a connector based on Regex Avro',
    'Validate a connector config',
    'Delete a VM',
    'Delete all the topics',
    'Delete all the connector',
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
           createInstance().catch(e => console.log(e));
            break;
        case 2:
            requests[0]();
            break;
        case 3:
            requests[1]();
            break;
        case 4:
            requests[2]();
            break;
        case 5:
              requests[5]();

            // request({ url: '/connector-plugins/DatagenConnector/config/validate', data: pre_template, method: 'put' }).then((response) => console.log(response.data));
            
            break;
        case 6:
            deleteInstance();
        case 7:
            adminClient.connect();
            adminClient.deleteTopic("Template_Schema", 10000, a => console.log("Template_Schema : NOT DELETED : " + a));
            adminClient.deleteTopic("Regex_Schema", a => console.log("Regex_Schema : NOT DELETED : " + a));
            adminClient.disconnect();
            break;
        case 8:
            requests[3]();
            break;
        default:
            console.log('Invalid index');
            break;
    }
  
    rl.close();
  });

  
