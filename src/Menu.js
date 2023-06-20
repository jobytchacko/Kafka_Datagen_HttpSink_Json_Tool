import { requests } from './Kafka_Request.js';

export const question_display = () => {
    const questions = [
        'Create a VM',
        'Get a list of all connector plugins',
        'Create a connector based on Avro Schema',
        'Create a connector based on JSON message',
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

export const menu_question = (answer, schema) => {
    
    if(parseInt(answer) != 1)
    console.log("IP Address : "+ ips[0].split(':8083')[0]);
   
    switch (parseInt(answer)) {
        case 1:
            requests[1]();
            break;
        case 2:
            requests[2]();
            break;
        case 3:
            requests[3](schema);
            break;
        case 4:
            requests[4](schema);
            break;
        case 5:
            requests[5](schema);
            break;
        case 6:
            requests[6]();
            break;
        case 7:
            requests[7]();
            break;
        case 8:
            requests[8]();
            break;
        default:
            console.log('Invalid index');
            break;
    }


}
