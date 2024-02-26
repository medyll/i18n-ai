#!/usr/bin/env  nod
import inquirer from "inquirer";
import fs from "fs-extra";

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
    validate: (input: string | any[]) => input.length > 0, // Vérifie que au moins un répertoire est sélectionné
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

// prettier-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
//° @ts-ignore */
function applie(code: string) {
  switch (code) {
    case "language":
      break;
  }
}

const jsConfigFile = "i18n-ai.config.js";

/**
 * Creates a config file.
 *
 * This function uses the fs-extra library to create a file at the root directory if it doesn't already exist.
 * It also writes content to the file if it doesn't already exist.
 * Progress on the jobs is logged.
 */
// prettier-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
//° @ts-ignore */
function createfigfile() {
  const content = `""`;

  fs.ensureFile(jsConfigFile)
    .then(() => {
      console.log(`${jsConfigFile} created`);
      return fs.writeFile(jsConfigFile, content);
    })
    .then(() => {
      console.log(`${jsConfigFile} written to`);
    })
    .catch((err) => {
      console.error(err);
    });
}

main();
