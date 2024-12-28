export const getTranslationsAndExamplesPrompt = (word: string): string => `
Translate the French word or phrase '${word}' into English and Russian. Focus on common, everyday meanings. Return more possible translations, if avaible.
Provide at least 3 examples for each translation.
Return only valid JSON without any additional text, backticks, or formatting. The response must strictly follow this structure:
{
  "correctedWord": "...",
  "translations": [
    { "language": "EN", "text": "...", "type": "..." },
    { "language": "RU", "text": "...", "type": "..." }
  ],
  "examples": [
    {
      "language": "FR",
      "sentence": "...",
      "translations": {
        "EN": "...",
        "RU": "..."
      }
    }
  ]
}
`;
