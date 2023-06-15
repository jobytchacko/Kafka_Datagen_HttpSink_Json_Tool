import { menu_question, question_display } from './Menu.js'
import inquirer from 'inquirer';


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
      menu_question(ans.index, ans.schema);
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment");
    } else {
        console.log("Something else went wrong"+error);
      }
    });
}


firstBlock();