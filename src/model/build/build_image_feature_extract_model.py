from tensorflow.python.saved_model import builder
from tensorflow.python.saved_model.signature_def_utils import predict_signature_def
from tensorflow.python.saved_model import tag_constants

from tensorflow.keras.models import model_from_json
import tensorflow as tf
import os

# Follow this directory structure
model_version = '1'
export_dir = 'export/Servo/' + model_version

# delete export dir recurrsively if exits
# import shutil
# shutil.rmtree(export_dir)
os.system('rm -rf export')


# Build the Protocol Buffer SavedModel at 'export_dir'
build = builder.SavedModelBuilder(export_dir)

# Load the model
with open("../architecture and weights/image_feature_extract_model.json", 'r') as file_reader:
    json_model = file_reader.read()

loaded_model = model_from_json(json_model)
loaded_model.load_weights("../architecture and weights/image_feature_extract_model.h5")

if tf.executing_eagerly():
   tf.compat.v1.disable_eager_execution()
   print("Disassembling Eager Execution")

# Create prediction signature to be used by Tensorflow Serving Predict API
signature = predict_signature_def(
    inputs = {"inputs": loaded_model.input},
    outputs = {"outputs": loaded_model.output}
)


# Note InceptionV3 was trained on tf 1.x 
from tensorflow.compat.v1.keras import backend as K
with K.get_session() as sess:
    # Save the meta graph and variables
    build.add_meta_graph_and_variables(
        sess=sess, tags=[tag_constants.SERVING], \
        signature_def_map={"serving_default": signature})
    build.save()

import tarfile
with tarfile.open('image_feature_extract.tar.gz', mode='w:gz') as archive:
    archive.add('./export', recursive=True)

# # Clean up the export dir
# shutil.rmtree(export_dir)

# Remove dir
os.system('rm -rf export')