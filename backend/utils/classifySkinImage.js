import env from '../config/env.js';

/**
 * Classifies an uploaded image to check:
 * 1. Is it human skin?
 * 2. Is the skin healthy or unhealthy?
 *
 * @param {string} imageUrl - Cloudinary image URL
 * @param {string} base64Image - Base64 string of the file (optional)
 * @param {string} mimeType - File mime type (optional)
 * @returns {Promise<{ is_skin: boolean, is_healthy: boolean, classification: 'NOT_SKIN' | 'HEALTHY' | 'UNHEALTHY', reason: string }>}
 */
const classifySkinImage = async (imageUrl, base64Image, mimeType = 'image/jpeg') => {
    const apiKey = env.GEMINI_API_KEY;

    const classificationPrompt = `
You are an expert medical visual AI assistant specializing in dermatology and skin analysis.
Analyze the provided image carefully and determine:
1. Is this image showing human skin (such as a close-up or clear view of human skin, arm, leg, face, neck, torso, skin lesion, rash, wound, etc.)?
2. If it IS human skin, is the skin HEALTHY (intact, normal human skin with no active diseases, rashes, lesions, wounds, infections, or abnormal spots) or UNHEALTHY (showing visible skin disease, lesion, rash, infection, inflammation, irritation, or abnormality)?

You MUST respond strictly with a raw valid JSON object (no markdown formatting, no \`\`\`json block, no extra text):
{
  "is_skin": true,
  "is_healthy": false,
  "classification": "UNHEALTHY",
  "reason": "Short clear explanation"
}

Where 'classification' MUST be exactly one of: "NOT_SKIN", "HEALTHY", or "UNHEALTHY".
`;

    // Try Gemini API if GEMINI_API_KEY is configured
    if (apiKey && !apiKey.startsWith('<')) {
        try {
            console.log("Classifying image using Gemini Vision API...");
            
            let parts = [];
            parts.push({ text: classificationPrompt });

            if (base64Image) {
                const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, '');
                parts.push({
                    inline_data: {
                        mime_type: mimeType,
                        data: cleanBase64
                    }
                });
            } else if (imageUrl) {
                const imgRes = await fetch(imageUrl);
                const arrayBuffer = await imgRes.arrayBuffer();
                const fetchedBase64 = Buffer.from(arrayBuffer).toString('base64');
                const contentType = imgRes.headers.get('content-type') || mimeType;
                parts.push({
                    inline_data: {
                        mime_type: contentType,
                        data: fetchedBase64
                    }
                });
            }

            const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-3.5-flash-lite'];
            let resultText = null;

            for (const modelName of modelsToTry) {
                try {
                    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
                    const geminiRes = await fetch(geminiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ parts }]
                        })
                    });

                    if (geminiRes.ok) {
                        const data = await geminiRes.json();
                        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                        if (text) {
                            resultText = text;
                            break;
                        }
                    } else {
                        const errBody = await geminiRes.text();
                        console.warn(`Gemini model ${modelName} returned status ${geminiRes.status}:`, errBody);
                    }
                } catch (e) {
                    console.warn(`Error trying Gemini model ${modelName}:`, e.message);
                }
            }

            if (resultText) {
                const cleanedText = resultText.replace(/```json/gi, '').replace(/```/g, '').trim();
                const parsed = JSON.parse(cleanedText);
                console.log("Gemini classification output:", parsed);
                const is_skin = parsed.is_skin === true || parsed.classification === 'HEALTHY' || parsed.classification === 'UNHEALTHY';
                const is_healthy = parsed.is_healthy === true || parsed.classification === 'HEALTHY';
                const classification = parsed.classification || (is_skin ? (is_healthy ? 'HEALTHY' : 'UNHEALTHY') : 'NOT_SKIN');
                
                return {
                    is_skin,
                    is_healthy,
                    classification,
                    reason: parsed.reason || ''
                };
            }
        } catch (err) {
            console.error("Gemini classification error:", err.message);
        }
    }

    // Fallback: Groq Vision API if GROQ_API_KEY is available
    if (env.GROQ_API_KEY && !env.GROQ_API_KEY.startsWith('<')) {
        try {
            console.log("Classifying image using Groq Vision API fallback...");
            const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama-3.2-11b-vision-preview",
                    messages: [
                        {
                            role: "user",
                            content: [
                                { type: "text", text: classificationPrompt },
                                { type: "image_url", image_url: { url: imageUrl } }
                            ]
                        }
                    ],
                    response_format: { type: "json_object" }
                })
            });

            if (groqRes.ok) {
                const data = await groqRes.json();
                const text = data?.choices?.[0]?.message?.content;
                if (text) {
                    const parsed = JSON.parse(text);
                    console.log("Groq Vision classification output:", parsed);
                    const is_skin = parsed.is_skin === true || parsed.classification === 'HEALTHY' || parsed.classification === 'UNHEALTHY';
                    const is_healthy = parsed.is_healthy === true || parsed.classification === 'HEALTHY';
                    const classification = parsed.classification || (is_skin ? (is_healthy ? 'HEALTHY' : 'UNHEALTHY') : 'NOT_SKIN');

                    return {
                        is_skin,
                        is_healthy,
                        classification,
                        reason: parsed.reason || ''
                    };
                }
            }
        } catch (err) {
            console.error("Groq Vision classification failed:", err.message);
        }
    }

    // Default safety fallback if vision services fail
    return {
        is_skin: true,
        is_healthy: false,
        classification: 'UNHEALTHY',
        reason: 'Default classification fallback'
    };
};

export default classifySkinImage;
