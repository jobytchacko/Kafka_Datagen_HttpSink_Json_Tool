import { menu_question, question_display } from './Menu.js'
import inquirer from 'inquirer';


async function firstBlock() {

  question_display();

  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Select Item Index : '
    },
    {
      type: 'input',
      name: 'name1',
      message: 'Provide File Index : ',
      when : (answers) => answers.name === '4'
    }
  ])
    .then((answers) => {
      console.log(answers);
      menu_question(answers.name, answers.name1);
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}


firstBlock();