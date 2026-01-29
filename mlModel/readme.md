# AyurVision ML Model - Skin Disease Detection API

## Overview

This folder contains the machine learning model and FastAPI-based REST API for skin disease detection. The system uses a pre-trained EfficientNetB0 deep learning model to analyze skin images and predict the type of skin disease with confidence scores.

## Features

- **Skin Disease Classification**: Detects 10 different types of skin diseases
- **FastAPI REST API**: High-performance API for image analysis
- **Pre-trained Model**: Uses EfficientNetB0 architecture with transfer learning
- **Health Monitoring**: Built-in health check endpoints
- **Error Handling**: Comprehensive error handling for invalid images and server errors

## Supported Skin Diseases

The model can predict the following 10 skin disease classes:

1. **Eczema** - Inflammatory skin condition causing itching and redness
2. **Warts Molluscum** - Viral skin infection causing small bumps
3. **Melanoma** - Serious form of skin cancer
4. **Atopic Dermatitis** - Chronic inflammatory skin disorder
5. **Basal Cell Carcinoma (BCC)** - Most common type of skin cancer
6. **Melanocytic Nevi (NV)** - Common moles on skin
7. **Benign Keratosis-like Lesions (BKL)** - Non-cancerous skin growths
8. **Psoriasis Pictures Lichen Planus** - Chronic autoimmune skin disease
9. **Seborrheic Keratoses or other Benign Tumors** - Common, non-cancerous skin growths
10. **Tinea Ringworm Candidiasis or other Fungal Infections** - Fungal skin infections

## Project Structure

```
mlModel/
├── app.py                           # Main FastAPI application
├── skin_disease_model.keras         # Pre-trained model weights
├── requirements.txt                 # Python dependencies
├── readme.md                        # This file
├── utils/
│   ├── classes.py                   # Disease class labels
│   ├── load_model.py                # Model loading and architecture
│   └── predict.py                   # Prediction logic
└── myenv/                           # Python virtual environment
```

## Installation

### Prerequisites
- Python 3.10 or higher
- pip package manager

### Setup Instructions

1. **Navigate to the mlModel directory:**
   ```bash
   cd mlModel
   ```

2. **Create a virtual environment (if not already created):**
   ```bash
   python3 -m venv myenv
   ```

3. **Activate the virtual environment:**
   ```bash
   # On Linux/Mac
   source myenv/bin/activate
   
   # On Windows
   myenv\Scripts\activate
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Running the API

### Start the API Server

```bash
fastapi run app.py
```

**Parameters:**
- `--reload`: Auto-reload on code changes (development mode)
- `--host 0.0.0.0`: Listen on all network interfaces
- `--port 8000`: Server runs on port 8000

The API will be available at: `http://localhost:8000`

### Access API Documentation

- **Interactive Swagger UI**: `http://localhost:8000/docs`
- **ReDoc Documentation**: `http://localhost:8000/redoc`

## API Endpoints

### 1. Home Endpoint

**Endpoint:** `GET /`

**Description:** Returns a welcome message and API purpose.

**Response (Success - 200):**
```json
{
  "response": "This is the api for the skin disease prediction."
}
```

---

### 2. Health Check Endpoint

**Endpoint:** `GET /health`

**Description:** Check the API health status and model information.

**Response (Success - 200):**
```json
{
  "status": "OK",
  "model_version": "1.0.0",
  "model_loaded": true
}
```

**Notes:**
- Verifies that the model is loaded correctly
- Useful for monitoring and deployment health checks
- Returns `model_loaded: false` if there's an issue loading the model

---

### 3. Skin Disease Prediction Endpoint

**Endpoint:** `POST /predict`

**Description:** Analyzes a skin image and predicts the disease type with confidence percentage.

**Query Parameters:**
```
image_url: str (required) - URL or file path to the skin image
           Default: 'https://example.com/skin_image.jpg'
```

**Request Example:**
```
POST /predict?image_url=https://example.com/skin_image.jpg
```

**Response (Success - 200):**
```json
{
  "response": {
    "prediction": "Melanoma",
    "prediction_confidence": "92.5%"
  }
}
```

**Response (Error - 400):**
```json
{
  "response": "invalid image address or broken image"
}
```

**Response (Error - 500):**
```json
{
  "response": "Something went wrong"
}
```

**Error Handling:**
- **400 Bad Request**: When the image URL is invalid, broken, or image cannot be loaded
- **500 Internal Server Error**: For unexpected server-side errors

**Notes:**
- Image is resized to 224×224 pixels for model input
- Confidence score is returned as a percentage
- Model processes images from both URLs and local file paths
- Higher confidence percentage indicates higher prediction accuracy

---

## Core Components

### 1. Model Architecture ([utils/load_model.py](mlModel/utils/load_model.py))

**Architecture:** Sequential model based on EfficientNetB0

```python
- Input Layer: (224, 224, 3) RGB images
- Base Model: EfficientNetB0 (pretrained, transfer learning)
- Global Average Pooling: Reduces spatial dimensions
- Batch Normalization: Normalizes layer inputs
- Dropout (30%): Prevents overfitting
- Output Layer: 10 classes with softmax activation
```

**Functions:**
- `create_model(num_classes=10)`: Creates the model architecture
- `load_model_weights(model_path)`: Loads pre-trained weights from disk

### 2. Prediction Logic ([utils/predict.py](mlModel/utils/predict.py))

**Process:**
1. Fetches image from provided URL
2. Converts image to RGB format (handles different formats)
3. Resizes image to 224×224 pixels using bilinear interpolation
4. Converts image to array and adds batch dimension
5. Runs model inference with verbose=0 (no output)
6. Returns prediction probabilities for all 10 classes

**Input Processing:**
- Image is normalized by PIL and TensorFlow
- Supports multiple image formats (JPEG, PNG, etc.)
- Automatic format conversion to RGB

### 3. Disease Classes ([utils/classes.py](mlModel/utils/classes.py))

Contains an ordered list of 10 disease class labels. The index in this list corresponds to the model's output layer neurons.

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| tensorflow | Latest | Deep learning framework and pre-trained models |
| fastapi | Latest | Web framework for building REST APIs |
| fastapi[standard] | Latest | Standard extras for FastAPI |
| pillow | Latest | Image processing and manipulation |

---

## Image Requirements

- **Format**: JPEG, PNG, or other common image formats
- **Size**: Any size (automatically resized to 224×224)
- **Content**: Skin lesion or disease-related image
- **Source**: URL accessible or local file path

---

## Model Details

- **Architecture**: EfficientNetB0 with custom head
- **Input Shape**: (224, 224, 3) - RGB images
- **Output Classes**: 10 skin disease categories
- **Weights File**: `skin_disease_model.keras`
- **Training**: Transfer learning from ImageNet pre-trained weights
- **Activation**: Softmax (multi-class classification)

---

## Usage Examples

### Using cURL

```bash
# Predict from URL
curl -X POST "http://localhost:8000/predict?image_url=https://example.com/skin_image.jpg"

# Health check
curl -X GET "http://localhost:8000/health"
```

### Using Python Requests

```python
import requests

# Health check
response = requests.get('http://localhost:8000/health')
print(response.json())

# Make prediction
response = requests.post(
    'http://localhost:8000/predict',
    params={'image_url': 'https://example.com/skin_image.jpg'}
)
print(response.json())
```

### Using JavaScript Fetch

```javascript
// Health check
fetch('http://localhost:8000/health')
  .then(res => res.json())
  .then(data => console.log(data));

// Make prediction
fetch('http://localhost:8000/predict?image_url=https://example.com/skin_image.jpg', {
  method: 'POST'
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## Performance Considerations

- **Model Size**: EfficientNetB0 is a lightweight, efficient model suitable for deployment
- **Inference Speed**: Typically processes images in 1-3 seconds depending on server resources
- **Memory Usage**: ~500MB for model and dependencies
- **Accuracy**: Model trained on standard skin disease datasets

---

## Future Improvements

- [ ] Add batch prediction support for multiple images
- [ ] Implement model confidence thresholds
- [ ] Add image preprocessing recommendations (crop, rotation)
- [ ] Integrate with the backend disease database
- [ ] Add model versioning and A/B testing
- [ ] Implement request logging and analytics
- [ ] Add authentication and rate limiting
- [ ] Support for different model architectures

---

## Notes

- The model currently returns predictions but does not store them in the database (integration with backend required)
- This is a binary file model; ensure you have the `skin_disease_model.keras` weights file in the project root
- The API is designed to be stateless for easy scaling and deployment
- CORS is not configured by default; add CORS middleware if needed for frontend integration

---

## Support & Contact

For issues, questions, or improvements, please refer to the main AyurVision project documentation.
