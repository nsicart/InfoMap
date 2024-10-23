const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const { prompt, language } = JSON.parse(event.body);
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `Describe the point "${prompt}" in ${language}.` }],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ description: data.choices[0].message.content.trim() })
    };
  } catch (error) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: `Request failed: ${error.message}` })
    };
  }
};




