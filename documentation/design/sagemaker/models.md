----------------------------------------
# Redundent as of now
----------------------------------------
# Models Configuration

1. captionit-model
    - Model used to extract features from last hidden layer of InceptionV3 to pass it further to CNN
    Note: Expects the input is shaped (299, 299, 3)
    Returns: Feature shaped (64, 2048)
    Inference code Image: inceptionv3-feature-extract-image
    Model Artifacts: 
2.  