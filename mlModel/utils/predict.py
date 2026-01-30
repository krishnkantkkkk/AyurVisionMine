import requests
import tensorflow as tf
import numpy as np
from PIL import Image
from io import BytesIO

def predict_skin_disease(model, image_url):
    try:
        print("Predicting....")
        response = requests.get(image_url)
        response.raise_for_status()
        img = Image.open(BytesIO(response.content)).convert('RGB')
        img = img.resize((224, 224), Image.Resampling.BILINEAR)
        img_array = tf.keras.utils.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        
        predictions = model.predict(img_array, verbose=0)
        print("Prediction Done !!!")
        return predictions
    except requests.exceptions.HTTPError as e:
        raise FileNotFoundError("URL is Invalid or Broken")
    except Exception as e:
        print(e)