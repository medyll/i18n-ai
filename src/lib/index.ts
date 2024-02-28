#!/usr/bin/env  node
export { i18nAi } from './i18n-ai.js';
import { fileURLToPath } from 'url';
import { resolve } from 'path';
//import { watch } from './i18n-ai-watcher.js';

const command = process.argv[2];

if (resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
	switch (command) {
		case undefined:
		case 'install':
			import('./i18n-ai-install.js');
			break;
		case '--watch':
			//watch();
			break;
		case 'update':
			break;
		case '--help':
			break;
		default:
			console.log('unknown command, aborting');
	}
}
// https://gist.github.com/ssskip/5a94bfcd2835bf1dea52

export type I18nAiPathType<T> = T extends object
	? {
			[K in keyof T]: T[K] extends null | undefined
				? K & string
				: `${K & string}${'' extends I18nAiPathType<T[K]> ? '' : '.'}${I18nAiPathType<T[K]>}`;
		}[keyof T]
	: '';

// type I18nAiKey = I18nAiPathType<typeof translations.en>;
