const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

exports.handler = async (event) => {
  try {
    const { prompt, language } = JSON.parse(event.body);
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Describe the point "${prompt}" in ${language}.` }],
      max_tokens: 150,
      temperature: 0.7
    });

    const description = response.data.choices[0].message.content.trim();
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ description })
    };
  } catch (error) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: `Request failed: ${error.message}` })
    };
  }
};




