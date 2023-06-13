import {requests} from './Kafka_Request.js';
import { createInstance, deleteInstance, getIPAddress } from  './VM_Manager.js';


export const question_display = () => {
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

}

export const menu_question = (answer) => {

   

    const index = parseInt(answer, 10);

console.log(index);

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

            // async function getUserInput() {

            // rl1.question('Enter t question: ', (answer) => {  console.log('Command-line input received:') });

            // prompt.start();
            //  prompt.get(['username', 'email'], function (err, result) {

            //   console.log('Command-line input received:');
            //   console.log('  username: ' + result.username);
            //   console.log('  email: ' + result.email);
            // });
            //  wait(9);

            // }

            //   requests[5]();

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


}
