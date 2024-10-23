const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    console.log("Event received:", event);
    const { prompt, language } = JSON.parse(event.body);
    
    console.log("Prompt:", prompt);
    console.log("Language:", language);
    
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `Provide a brief description of the point of interest "${prompt}" in ${language}.`,
        max_tokens: 150,
        temperature: 0.7,
        top_p: 1.0
      })
    });

    if (!response.ok) {
      console.error(`API response error: ${response.status} ${response.statusText}`);
      throw new Error(`API response error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response:", data);
    
    if (!data.choices || !data.choices[0] || !data.choices[0].text) {
      console.error("Unexpected API response format", data);
      throw new Error("Unexpected API response format");
    }
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify({ description: data.choices[0].text.trim() })
    };
  } catch (error) {
    console.error("Error processing request:", error);
    return {
      statusCode: 502,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify({ error: `Error processing request: ${error.message}` })
    };
  }
};


