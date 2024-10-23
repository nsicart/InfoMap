const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    const { prompt, language } = JSON.parse(event.body);
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `Proporciona una breu descripció del lloc d'interès "${prompt}" en ${language}.`,
        max_tokens: 150
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error processing request' })
    };
  }
};
