import fetch from 'node-fetch';

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
        prompt: `Provide a brief description of the point of interest "${prompt}" in ${language}.`,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      throw new Error(`API response error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ description: data.choices[0].text.trim() })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ error: `Error processing request: ${error.message}` })
    };
  }
};

