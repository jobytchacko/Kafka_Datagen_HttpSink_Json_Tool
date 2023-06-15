import { menu_question, question_display } from './Menu.js'
import inquirer from 'inquirer';
import {  getIPAddressURL } from  './Kafka_Request.js';
    
global.ips = "";
getIPAddressURL();

async function firstBlock() {

  question_display();

    inquirer.prompt([
        {
            type: 'input',
            name: 'index',
            message: 'Select Item Index : '
        },
        {
            type: 'editor',
            name: 'schema',
            message: 'Provide schema : ',
            when: (ans) => ans.index === '3'
        },
        {
            type: 'editor',
            name: 'schema',
            message: 'Provide json : ',
            when: (ans) => ans.index === '4'
        },
    ])
    .then((ans) => {
        let singleLineJson = "";
        if(ans.schema != undefined)
        singleLineJson = JSON.stringify(JSON.parse(ans.schema), null, '');
        console.log(singleLineJson);
        let temp_delay = () => menu_question(ans.index, singleLineJson) 
        ips == "" ? setTimeout(temp_delay, 1000) : temp_delay()
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment");
    } else {
        console.log("Something else went wrong"+error);
      }
    });
}


console.log("WELCOME TO KAFKA DATA GENERATOR");
setTimeout(firstBlock, 1000);
