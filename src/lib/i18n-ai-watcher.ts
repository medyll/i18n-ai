#!/usr/bin/env  node
import chokidar from 'chokidar';
import path from 'path';
// import { i18nConfig } from '../../i18n-ai.config.js';

export function watch() {
	console.log('watching');
	const watcher = chokidar.watch('./src/configuration/locales', {
		persistent: true
	});

	watcher
		.on('add', (path) => console.log(`File ${path} has been added`))
		.on('change', (path) => console.log(`File ${path} has been changed`))
		.on('unlink', (path) => console.log(`File ${path} has been removed`));

	console.log('watching');
}
