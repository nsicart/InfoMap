const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
console.log("API Key:", process.env.OPENAI_API_KEY);

exports.handler = async (event) => {
  try {
    const { prompt, language } = JSON.parse(event.body);
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
    
    });

    const description = response.choices[0].message.content.trim();
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
