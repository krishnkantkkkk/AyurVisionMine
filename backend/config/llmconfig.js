import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

const llmResponse = async (disease, prompt)=>{
    const response = await client.responses.create({
        model: "openai/gpt-oss-20b",
        input: "Diseae : (" + disease + ") " + prompt,
    });
    return JSON.parse(response.output_text)
}

export default llmResponse