from fastapi import FastAPI, Response
from utils.predict import predict_skin_disease
from utils.load_model import load_model_weights
from utils.classes import classes
import numpy as np

model = load_model_weights('skin_disease_model.keras')

MODEL_VERSION = '1.0.0'

app = FastAPI()

@app.get("/")
def home():
    return {
        "response" : "This is the api for the skin disease prediction."
    }
@app.get('/health')
def health():
    return{
        'status' : "OK",
        'model_version' : MODEL_VERSION,
        'model_loaded' : model is not None
    }

@app.post('/predict')
def predict(response : Response, image_url : str = 'image.jpg'):
    try:
        prediction = predict_skin_disease(model, image_url)
        response.status_code = 200
        return{
            "response":{
                "prediction" : classes[np.argmax(prediction)],
                "prediction_confidence" : f"{np.max(prediction)*100}%"
            }
        }
    except FileNotFoundError as e:
        response.status_code = 400
        return{
            "response":"invalid image address or broken image"
        }
    except Exception as e:
        response.status_code = 500
        return{
            "response":"Something went wrong"
        }