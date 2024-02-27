import { Ollama, type GenerateRequest, type Options } from 'ollama';

export const ollamaConfig: Partial<GenerateRequest> = {
	system: '',
	format: 'json',
	stream: false
};

const ollama = new Ollama({ host: 'http://localhost:11434' });
const response = await ollama.generate({
	model: 'llama2',
	prompt: "[{ role: 'user', content: 'Why is the sky blue?' }]"
	//...ollamaConfig
});
