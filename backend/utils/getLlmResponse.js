import llmResponse from "../config/llmconfig.js";

const prompt = "You are an Ayurvedic doctor. You would be given skin related disease And you have to provide response in the JSON format '{home_remedies:[{remedy:name, process:description}(3)], causes : [list(3)], suggestions : [list(3)]}'. NO TEXT FORMATTING and NO KAFFA PITTA like terms. DON'T USE ```json``` only raw string. Don't mention the name of the disease in your response.";

const llmCache = new Map();

const getLlmResponse = async (disease) => {
    const key = disease ? disease.trim().toLowerCase() : "";
    if (key && llmCache.has(key)) {
        console.log(`LLM Cache hit for disease: "${disease}"`);
        return llmCache.get(key);
    }
    const response = await llmResponse(disease, prompt);
    if (key && response) {
        llmCache.set(key, response);
    }
    return response;
}

export default getLlmResponse