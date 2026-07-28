import OpenAI from "openai";
import env from './env.js';

const groqClient = env.GROQ_API_KEY && !env.GROQ_API_KEY.startsWith('<') 
    ? new OpenAI({
        apiKey: env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1",
      })
    : null;

const llmResponse = async (inputData, promptText) => {
    const fullPrompt = `${promptText}\n\nInput Data:\n${typeof inputData === 'object' ? JSON.stringify(inputData, null, 2) : inputData}`;
    let rawText = null;

    if (groqClient) {
        try {
            const completion = await groqClient.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: "You are an expert medical visual AI and Ayurvedic skin care assistant. Always output valid JSON." },
                    { role: "user", content: fullPrompt }
                ],
                response_format: { type: "json_object" }
            });
            rawText = completion.choices?.[0]?.message?.content;
        } catch (err) {
            console.warn("Groq LLM primary call failed, trying llama-3.1-8b-instant:", err.message);
            try {
                const fallbackCompletion = await groqClient.chat.completions.create({
                    model: "llama-3.1-8b-instant",
                    messages: [
                        { role: "system", content: "You are an expert medical visual AI and Ayurvedic skin care assistant. Always output valid JSON." },
                        { role: "user", content: fullPrompt }
                    ],
                    response_format: { type: "json_object" }
                });
                rawText = fallbackCompletion.choices?.[0]?.message?.content;
            } catch (err2) {
                console.warn("Groq fallback failed:", err2.message);
            }
        }
    }

    if (!rawText && env.GEMINI_API_KEY && !env.GEMINI_API_KEY.startsWith('<')) {
        try {
            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`;
            const geminiRes = await fetch(geminiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: fullPrompt }] }]
                })
            });
            if (geminiRes.ok) {
                const data = await geminiRes.json();
                rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            }
        } catch (err) {
            console.warn("Gemini LLM call failed:", err.message);
        }
    }

    if (!rawText) {
        console.warn("LLM services unavailable, using default fallback response");
        return {
            home_remedies: [
                { remedy: "Aloe Vera Gel", process: "Apply pure, organic aloe vera gel to soothingly hydrate skin without irritation." },
                { remedy: "Coconut & Neem Oil", process: "Gently apply a diluted mixture to maintain skin moisture and natural microbial balance." },
                { remedy: "Cool Oatmeal Compress", process: "Use a lukewarm oatmeal bath or washcloth compress to calm skin gently." }
            ],
            causes: [
                "Environmental triggers or allergen exposure",
                "Skin barrier compromise or dryness",
                "Stress and internal metabolic imbalance"
            ],
            suggestions: [
                "Maintain gentle skin hydration with fragrance-free natural moisturizers.",
                "Avoid harsh chemical soaps or aggressive scrubbing.",
                "Consult a certified dermatologist if symptoms persist or change."
            ]
        };
    }

    const cleanedText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
};

export default llmResponse;