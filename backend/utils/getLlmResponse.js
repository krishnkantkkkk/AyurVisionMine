import llmResponse from "../config/llmconfig.js";

const multiCategoryUnhealthyPrompt = `You are an expert Ayurvedic doctor and holistic skin care specialist.
You are provided with visual AI classifier confidence scores across multiple candidate skin disease categories.

Instructions:
1. Provide remedies and suggestions considering the relative confidence scores of ALL predicted categories, rather than relying on only one prediction.
2. CRITICAL SAFETY DIRECTIVE: Suggest remedies and suggestions that are safe, gentle, and non-aggravating. If they do not cure the skin condition, they MUST NOT MAKE IT WORSE or aggravate any of the potential candidate conditions. Avoid harsh, abrasive, or extreme heat/drying treatments.

Respond strictly with a valid JSON object matching this structure:
{
  "home_remedies": [
    { "remedy": "Gentle Remedy Name", "process": "Step-by-step application process and why it is safe across candidate conditions" }
  ],
  "causes": [
    "Potential cause or trigger considering the differential possibilities"
  ],
  "suggestions": [
    "Safe, non-aggravating dietary or lifestyle guidance"
  ]
}
Include exactly 3 home_remedies, 3 causes, and 3 suggestions. DO NOT use markdown, DO NOT use KAFFA PITTA like terms, and DO NOT wrap in \`\`\`json block.`;

const healthyPrompt = `You are an expert Ayurvedic doctor and skin wellness specialist. The user's skin scan shows Healthy Skin with no active skin disease.
Provide general daily skin care recommendations to maintain clear, healthy skin in JSON format:
{
  "home_remedies": [
    { "remedy": "Gentle Daily Cleansing / Hydration", "process": "Process description" },
    { "remedy": "Natural Sun Protection & Moisture", "process": "Process description" },
    { "remedy": "Herbal Skin Nourishment", "process": "Process description" }
  ],
  "causes": [
    "Proper hydration and balanced diet support healthy skin",
    "Consistent gentle hygiene prevents pore blockage",
    "Good sleep and stress management preserve skin vitality"
  ],
  "suggestions": [
    "Drink adequate water daily to maintain skin hydration.",
    "Use mild, natural, fragrance-free skin cleansers.",
    "Maintain a balanced diet rich in antioxidants and fresh vegetables."
  ]
}
Include exactly 3 home_remedies, 3 causes, and 3 suggestions. DO NOT use markdown, DO NOT use KAFFA PITTA like terms, and DO NOT wrap in \`\`\`json block.`;

const llmCache = new Map();

const getLlmResponse = async (predictionsData, type = 'unhealthy') => {
    const isHealthy = type === 'healthy' || 
        (typeof predictionsData === 'string' && (predictionsData.toLowerCase().includes('healthy')));
    
    let cacheKey = "";
    if (typeof predictionsData === 'string') {
        cacheKey = predictionsData.trim().toLowerCase();
    } else if (Array.isArray(predictionsData)) {
        cacheKey = predictionsData.map(p => `${p.category}:${p.confidence}`).join('|');
    }

    if (cacheKey && llmCache.has(cacheKey)) {
        console.log(`LLM Cache hit for key: "${cacheKey}"`);
        return llmCache.get(cacheKey);
    }

    const selectedPrompt = isHealthy ? healthyPrompt : multiCategoryUnhealthyPrompt;
    
    let formattedInput = "";
    if (isHealthy) {
        formattedInput = "Status: Healthy Skin";
    } else if (Array.isArray(predictionsData)) {
        formattedInput = "Category Confidence Breakdown:\n" + 
            predictionsData.map(p => `- ${p.category}: ${p.confidence}%`).join('\n');
    } else if (typeof predictionsData === 'object' && predictionsData !== null) {
        formattedInput = JSON.stringify(predictionsData, null, 2);
    } else {
        formattedInput = String(predictionsData || "Unhealthy Skin");
    }

    const response = await llmResponse(formattedInput, selectedPrompt);
    if (cacheKey && response) {
        llmCache.set(cacheKey, response);
    }
    return response;
};

export default getLlmResponse;