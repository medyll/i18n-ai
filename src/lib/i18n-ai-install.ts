#!/usr/bin/env  node
import inquirer, { type Answers, type QuestionAnswer } from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';

const jsConfigFile = 'i18n-ai.config.js';
const extensions: Record<string, any> = {
	typescript: 'ts',
	javascript: 'js',
	json: 'json'
};

const questions = [
	{
		type: 'checkbox',
		name: 'languages',
		message: 'Choose the available languages:',
		choices: [
			'English',
			'French',
			'Spanish',
			'Italian',
			'German',
			'Portuguese',
			'Russian',
			'Chinese',
			'Romanian',
			'Russian',
			'Turkish',
			'Ukrainian',
			'Vietnamese'
		],
		default: 'English'
	},
	{
		type: 'list',
		name: 'fileType',
		message: 'What type of file do you want to use for i18n-ai declarative files?',
		choices: ['typescript', 'javascript', 'json'],
		default: 'typescript'
	},
	{
		type: 'input',
		name: 'ollamaApiEndPoint',
		message: 'Enter the AI endpoint:',
		default: 'http://localhost:11454/api/generate'
	},
	{
		type: 'checkbox',
		name: 'credentialKeys',
		message: 'Enter the credential keys:',
		choices: ['open_ai', 'google', 'aws', 'azure', 'Enter your own key']
	},
	{
		type: 'list',
		name: 'defaultLanguage',
		choices: [],
		message: 'What is the default language?'
	},
	{
		type: 'input',
		name: 'i18nLocalesDirectory',
		message: 'Choose the directories (separated by comma) :',
		default: './src/configuration/locales',
		validate: (input: string | any[]) => input.length > 0
	}
];

async function i18nAi() {
	process.cwd();
	console.log('Welcome to i18n-ai installation');
	const answers: Record<string, any> = {};

	for (const question of questions) {
		console.log(question.message);
		const answer = await inquirer.prompt([question]);

		if (answer.credentialKeys === 'Enter your own key') {
			const customAnswer = await inquirer.prompt([
				{
					type: 'input',
					name: 'customKey',
					message: 'Enter your custom key name and value'
				}
			]);

			answer.credentialKeys = customAnswer.customKey;
		}

		if (question.name === 'languages') {
			questions[4].choices = answer.languages;
		}

		answers[question.name] = answer[question.name];
	}

	createConfigFile(answers);
	addPackageJsonKeys();

	const directories = answers['i18nLocalesDirectory'].split(',');

	// test si exist tsconfig.json, pour connaitre le type du projet //
	const isTsProject = fs.existsSync('tsconfig.json');
	const indexExtension = isTsProject ? 'ts' : 'js';

	directories?.forEach(async (directory: string) => {
		if (!directory || directory === '') return;
		await fs
			.mkdir(directory, { recursive: true })
			.then(() => {
				console.log(`${directory} created`);
				// create index.ts for language files
				const indexFile = `${directory}/index.${indexExtension}`;
				fs.ensureFileSync(indexFile);
				const size = fs.stat(indexFile);
				// create language files of fileType
				answers['languages'].forEach(async (language: string) => {
					const isoName = language.toLowerCase().slice(0, 2);
					const extension = extensions[answers['fileType']];

					const lfile = `${isoName}.${extension}`;

					const lfilePath = `${directory}/${lfile}`;
					await fs.ensureFileSync(lfilePath);
					///if the file is empty
					const size = await fs.stat(lfilePath);
					if (size.size === 0) {
						const asConst = extension === 'json' ? 'as const' : '';
						const content = `export const ${isoName} =  {};`;

						fs.writeFile(lfilePath, `${content} ${asConst};`);
					}
					// update indexFile
					fs.appendFile(indexFile, `export {${isoName}} from './${lfile}';\n`);
				});
			})
			.catch((err) => {
				console.error(err);
			});
	});
	/* Object.entries(answers).forEach(([key, value]) => {
		applies(key, value);
	}); */
}

/**
 * Creates a config file.
 */
function createConfigFile(answers: Answers) {
	const content = `import { i18naiConfig } from '@medyll/i18n-ai';
	export default i18naiConfig (${JSON.stringify(answers, null, '  ')});`;

	fs.ensureFile(jsConfigFile)
		.then(() => {
			console.log(`configuration file ${jsConfigFile} created`);
			return fs.writeFile(jsConfigFile, content);
		})
		.then(() => {
			// console.log(`${jsConfigFile} written to`);
		})
		.catch((err) => {
			console.error(err);
		});
}

async function addPackageJsonKeys() {
	execSync('npm pkg set scripts.i18nai=i18n-ai', { stdio: 'inherit' });
	execSync('npm pkg set scripts.i18nai:watch=i18nai --watch', { stdio: 'inherit' });
}

i18nAi();
