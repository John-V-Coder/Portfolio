exports.handler = async function(event, context) {
  // Ensure JSON responses always have proper headers
  const jsonHeaders = { 'Content-Type': 'application/json' };

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: jsonHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    let parsedBody = {};
    try {
      parsedBody = JSON.parse(event.body || '{}');
    } catch (e) {
      return {
        statusCode: 400,
        headers: jsonHeaders,
        body: JSON.stringify({ error: 'Invalid JSON body' })
      };
    }

    const { prompt } = parsedBody;

    if (!prompt || typeof prompt !== 'string') {
      return {
        statusCode: 400,
        headers: jsonHeaders,
        body: JSON.stringify({ error: 'Prompt is required' })
      };
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      return {
        statusCode: 500,
        headers: jsonHeaders,
        body: JSON.stringify({ error: 'API key not configured' })
      };
    }

    // Support environments where global fetch may not exist
    const fetchFn = typeof fetch === 'function' ? fetch : (await import('node-fetch')).default;

    let response;
    try {
      response = await fetchFn(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a helpful AI assistant for John Omondi's portfolio website. Answer questions about web development, John's services, or general inquiries professionally and concisely. User question: ${prompt}`
              }]
            }]
          })
        }
      );
    } catch (netErr) {
      console.error('Network/Fetch error calling Gemini:', netErr);
      return {
        statusCode: 502,
        headers: jsonHeaders,
        body: JSON.stringify({ error: 'Upstream service unreachable' })
      };
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error('Gemini API error:', errorText || response.statusText);
      return {
        statusCode: response.status,
        headers: jsonHeaders,
        body: JSON.stringify({ error: 'Failed to get response from AI' })
      };
    }

    // Guard against invalid/empty JSON
    let data;
    try {
      data = await response.json();
    } catch (e) {
      console.error('Invalid JSON from Gemini');
      return {
        statusCode: 502,
        headers: jsonHeaders,
        body: JSON.stringify({ error: 'Invalid response from AI' })
      };
    }

    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';

    return {
      statusCode: 200,
      headers: jsonHeaders,
      body: JSON.stringify({ answer })
    };

  } catch (error) {
    console.error('Unhandled function error:', error);
    return {
      statusCode: 500,
      headers: jsonHeaders,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}
