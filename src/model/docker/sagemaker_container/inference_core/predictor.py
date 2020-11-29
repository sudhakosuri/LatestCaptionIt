# This is the file that implements a flask server to do inferences. It's the file that you will modify
# to implement the prediction for your own algorithm.

from __future__ import print_function

import os, sys, stat
import json
import shutil
import flask
from flask import Flask, jsonify
import glob
import tensorflow as tf
import base64
import numpy as np
from io import BytesIO
from PIL import Image
import cv2
from models import build_model


MODEL_PATH = './opt/ml/'
max_length = 52 #from training

# A singleton for holding the model. This simply loads the model and holds it.
# It has a predict function that does a prediction based on the model and the input data.
class ClassificationService(object):
    
    def __init__(cls):
        cls.feature_extract_model = None
        cls.encoder = None
        cls.decoder = None

    @classmethod
    def get_model(cls):
        """Get the model object for this instance."""
        # Load InceptionV3 Model
        print(os.path.join(MODEL_PATH, "image_feature_extract_model.json"))
        with open(os.path.join(MODEL_PATH, "image_feature_extract_model.json"), 'r') as reader:
            json_data = reader.read()
        loaded_model = tf.keras.models.model_from_json(json_data)
        loaded_model.load_weights(os.path.join(MODEL_PATH, "image_features_extract_model.h5"))
        cls.feature_extract_model = loaded_model

        # Load the Enocoder-Decoder with Attention model
        encoder, decoder, optimizer = build_model()

        # Create a checkpoint to restore
        checkpoint_path = os.path.join(MODEL_PATH,"checkpoints/train")

        ckpt = tf.train.Checkpoint(encoder=encoder,
                                decoder=decoder,
                                optimizer = optimizer)
        ckpt_manager = tf.train.CheckpointManager(ckpt, checkpoint_path, max_to_keep=5)
        ckpt.restore(ckpt_manager.latest_checkpoint)

        #Save the model objects as a class attribute for infrerence
        cls.encoder = encoder
        cls.decoder = decoder

        # Load the tokenizer
        tokenizer_path = os.path.join(MODEL_PATH, "tokenizer.json")
        with open(tokenizer_path) as f:
            data = json.load(f)
            tokenizer = tf.keras.preprocessing.text.tokenizer_from_json(data)
            cls.tokenizer = tokenizer

        return loaded_model

    @classmethod
    def generate_caption(cls, features):

        hidden = cls.decoder.reset_state(batch_size=1)
        features = tf.reshape(features, (features.shape[0], -1, features.shape[3]))

        encoded_features = cls.encoder(features)

        dec_input = tf.expand_dims([cls.tokenizer.word_index['<start>']], 0)
        result = []

        for i in range(max_length):
            predictions, hidden, attention_weights = cls.decoder(dec_input, encoded_features, hidden)

            predicted_id = tf.random.categorical(predictions, 1)[0][0].numpy()
            result.append(cls.tokenizer.index_word[predicted_id])

            if cls.tokenizer.index_word[predicted_id] == '<end>':
                return result

            dec_input = tf.expand_dims([predicted_id], 0)

        return result

    @classmethod
    def predict(cls, input):
        """For the input, do the predictions and return them."""
        inceptionv3_features = cls.feature_extract_model(input)
        caption = cls.generate_caption(inceptionv3_features)
        return ' '.join(caption)

    @classmethod
    def heartbeats(cls):
        if cls.feature_extract_model:
            return True
        return False

# The flask app for serving predictions
app = flask.Flask(__name__)
ClassificationService.get_model()
print("Model loaded...ready for prediction")

@app.route('/ping', methods=['GET'])
def ping():
    """Determine if the container is working and healthy. In this sample container, we declare
    it healthy if we can load the model successfully."""
    health = ClassificationService.heartbeats() is not None  

    status = 200 if health else 404
    return flask.Response(response='\n', status=status, mimetype='application/json')

@app.route('/invocations', methods=['POST'])
def transformation():
    image_encoded =  flask.request.get_json()['image']
    image_binary = base64.b64decode(image_encoded)

    image_pil = Image.open(BytesIO(image_binary))
    rgb_image = image_pil.convert('RGB')
    image_array = np.array(rgb_image)

    # Resize image for inceptionV3
    image_array = cv2.resize(image_array, (299, 299), interpolation=cv2.INTER_AREA)
    image_array = np.expand_dims(image_array, axis=0)
   
    # Do the prediction
    predictions = ClassificationService.predict(image_array)
    
    # Convert result to JSON
    return_value = { "caption": {} }
    return_value["caption"] = str(predictions)

    return jsonify(return_value) 
