exports.handler = async function(event, context) {
  console.log("GEMINI_API_KEY is set:", !!process.env.GEMINI_API_KEY);
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const { prompt } = JSON.parse(event.body);

  if (!prompt) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Prompt is required' }),
    };
  }

  try {
    const apiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
      }
    );

    const responseText = await apiResponse.text();

    if (!apiResponse.ok) {
        let error = 'An unknown error occurred.';
        try {
            const errorJson = JSON.parse(responseText);
            if (errorJson.error && errorJson.error.message) {
                error = errorJson.error.message;
            }
        } catch (e) {
            // The response was not valid JSON
            error = responseText;
        }
        return {
            statusCode: apiResponse.status,
            body: JSON.stringify({ error }),
        };
    }

    const data = JSON.parse(responseText);
    const answer = data.candidates[0].content.parts[0].text;

    return {
      statusCode: 200,
      body: JSON.stringify({ answer }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch response from serverless function.' }),
    };
  }
}