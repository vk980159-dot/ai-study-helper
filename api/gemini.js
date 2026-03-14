export default async function handler(req, res) {

  try {

    const apiKey = process.env.GEMINI_API_KEY;

    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "Explain this topic in simple student-friendly notes:\n" + text
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log(data);

    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI could not generate response.";

    res.status(200).json({ result });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      result: "Server error generating notes"
    });

  }

}
