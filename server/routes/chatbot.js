const express = require("express");
const Groq = require("groq-sdk");

const router = express.Router();

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are MediConnect AI Health Assistant." },
        { role: "user", content: message }
      ]
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Chatbot error" });
  }
});

module.exports = router;
