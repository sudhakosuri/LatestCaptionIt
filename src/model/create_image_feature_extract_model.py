import tensorflow as tf
import os 

inceptionv3_model = tf.keras.applications.InceptionV3(include_top=False,
                                                      weights='imagenet')
new_input = inceptionv3_model.input
hidden_layer = inceptionv3_model.layers[-1].output

image_features_extract_model = tf.keras.Model(new_input, hidden_layer, name="InceptionV3")
image_features_extract_model.summary()

if not os.path.exists('architecture and weights'):
    os.mkdir('architecture and weights')
save_path = 'architecture and weights'

# Dump model architecture to JSON
model_json = image_features_extract_model.to_json()
with open(os.path.join(save_path,"image_feature_extract_model.json"), "w") as json_file:
    json_file.write(model_json)

# Save Model weights
image_features_extract_model.save_weights(os.path.join(save_path, 'image_features_extract_model.h5'))