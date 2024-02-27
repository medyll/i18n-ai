/**
use nodemon to watch the i18n files and update the AI model.
directories to watch are in ./i18n-ai.config.js
 */
import chokidar from 'chokidar';
import path from 'path';
import { i18nConfig } from '../../i18n-ai.config.js';

function watch() {
	const watcher = chokidar.watch(path.resolve(__dirname, i18nConfig.i18nLocalesDirectory), {
		persistent: true
	});

	watcher
		.on('add', (path) => console.log(`File ${path} has been added`))
		.on('change', (path) => console.log(`File ${path} has been changed`))
		.on('unlink', (path) => console.log(`File ${path} has been removed`));

	console.log('watching');
}
