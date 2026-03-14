export default async function handler(req, res) {

const apiKey = process.env.GEMINI_API_KEY;

const { text } = req.body;

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
parts: [{ text: "Summarize this study text: " + text }]
}
]
})
}
);

const data = await response.json();

const result = data.candidates[0].content.parts[0].text;

res.status(200).json({ result });

}
