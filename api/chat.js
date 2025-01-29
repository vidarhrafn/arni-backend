import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "API-lykill vantar" });
    }

    try {
        const { message } = req.body;

        const openai = new OpenAIApi(new Configuration({ apiKey }));
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [
                { role: "system", content: "Þú ert Árni, vinalegt spjallmenni sem talar íslensku og hjálpar notendum að æfa sig í tungumálinu." },
                { role: "user", content: message }
            ]
        });

        return res.status(200).json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error("API-fyrirspurn mistókst:", error);
        return res.status(500).json({ error: "Villa við API-fyrirspurn" });
    }
}
