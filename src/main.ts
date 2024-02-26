import inquirer from "inquirer";

const questions = [
  {
    type: "list",
    name: "language",
    message: "Choose the language:",
    choices: ["English", "French", "Spanish", "Italian"],
    default: "English",
  },
  {
    type: "list",
    name: "fileType",
    message: "What type of file do you want?",
    choices: ["json", "javascript", "typescript"],
  },
  {
    type: "input",
    name: "aiEndpoint",
    message: "Enter the AI endpoint:",
    default: "http://localhost:1154",
  },
  {
    type: "list",
    name: "credentialKeys",
    message: "Enter the credential keys:",
    choices: ["open_ai", "google", "aws", "azure", "Enter your own key"],
  },
  {
    type: "input",
    name: "defaultLanguage",
    message: "What is the default language?",
  },
  {
    type: "checkbox",
    name: "i18 directories",
    message: "Choose the directories:",
    choices: [],
    validate: (input) => input.length > 0, // Vérifie que au moins un répertoire est sélectionné
  },
];

async function main() {
  const answers = await inquirer.prompt(questions);

  if (answers.credentialKeys === "Enter your own key") {
    const customAnswer = await inquirer.prompt([
      {
        type: "input",
        name: "customKey",
        message: "Enter your custom key:",
      },
    ]);

    answers.credentialKeys = customAnswer.customKey;
  }

  console.log(answers);
}

main();
