exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ apiKey: process.env.GEMINI_API_KEY || 'not set' }),
  };
}