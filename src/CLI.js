import { menu_question, question_display } from './Menu.js'
import inquirer from 'inquirer';
import {  getIPAddress } from  './VM_Manager.js';
import minify from 'jsonminify';

global.ips = "";
await getIPAddress().catch(m => { console.log("\nVM is NOT created : \n") } )

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
        {
            type: 'editor',
            name: 'schema',
            message: 'Provide config : ',
            when: (ans) => ans.index === '5'
        },
        {
            type: 'input',
            name: 'url',
            message: 'Mention URL if sink connector needed : ',
            when: (ans) =>   ['3','4','5'].includes(ans.index)   
        }
    ])
    .then((ans) => { menu_question(ans.index, JSON.minify(ans.schema), ans.url) })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment");
    } else {
        console.log("Something else went wrong"+error);
      }
    });
}


console.log("WELCOME TO KAFKA DATA GENERATOR");
firstBlock();
