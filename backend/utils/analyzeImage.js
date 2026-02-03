const analyzeImage = async (image_url) =>{
    const ml_raw_response = await fetch(`${process.env.ML_API_URL}/predict`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            image_url: image_url
        })
    });
    const ml_response = await ml_raw_response.json();
    return ml_response;
}

export default analyzeImage