export type i18nConfig = {
	languages: string[];
	fileType: string;
	ollamaApiEndPoint: string;
	credentialKeys: string[];
	defaultLanguage: string;
	i18nLocalesDirectory: string;
};

export function i18naiConfig(config: i18nConfig) {
	return config;
}
