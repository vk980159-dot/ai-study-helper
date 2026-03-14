export default async function handler(req, res) {

const apiKey = process.env.GEMINI_API_KEY;
const { text } = req.body;

try{

const response = await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[
{
text:"Explain in simple student notes: " + text
}
]
}
]
})
}
);

const data = await response.json();

const result = data.candidates?.[0]?.content?.parts?.[0]?.text || "AI did not return text";

res.status(200).json({
result: result
});

}catch(error){

res.status(500).json({
result:"Error generating notes"
});

}

}
