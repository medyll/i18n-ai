import { i18naiConfig } from '@medyll/i18n-ai';export default i18naiConfig ({
  "languages": [
    "English",
    "French",
    "Spanish",
    "Italian",
    "German",
    "Portuguese"
  ],
  "fileType": "typescript",
  "ollamaApiEndPoint": "http://localhost:11454/api/generate",
  "credentialKeys": [],
  "defaultLanguage": "French",
  "i18nLocalesDirectory": "./src/configuration/locales"
});