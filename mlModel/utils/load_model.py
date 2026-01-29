import tensorflow as tf
from tensorflow.keras import layers, models

def create_model(num_classes=10):
    base_model = tf.keras.applications.EfficientNetB0(
        include_top=False, 
        weights=None,
        input_shape=(224, 224, 3)
    )
    
    model = models.Sequential([
        layers.Input(shape=(224, 224, 3)),
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.BatchNormalization(),
        layers.Dropout(0.3),
        layers.Dense(num_classes, activation='softmax')
    ])
    return model

def load_model_weights(model_path = 'model.keras'):
    try:
        model = create_model(num_classes=10)
        model.load_weights(model_path)
        return model
    except Exception as e:
        print(e)