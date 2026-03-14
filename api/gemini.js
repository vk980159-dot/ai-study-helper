export default async function handler(req, res) {

  try {

    const apiKey = process.env.GEMINI_API_KEY;
    const { text } = req.body;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: "Explain in simple student notes: " + text }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    let result = "";

    if (data.candidates && data.candidates.length > 0) {
      result = data.candidates[0].content.parts
        .map(p => p.text)
        .join("");
    }

    res.status(200).json({
      result: result || "No response generated"
    });

  } catch (error) {

    res.status(500).json({
      result: "Server error"
    });

  }

}
