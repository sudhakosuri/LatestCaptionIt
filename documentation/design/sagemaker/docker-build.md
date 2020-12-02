# Steps to build docker Image for deploying it to Sagemaker

1. inceptionv3-feature-extract-docker-image
    1. Navigate to /src/model/docker/inceptionv3_feature_extraction
    2. Run docker build -t inceptionv3-feature-extract-image .
       Note: name should match as per repository entry (AWS ECR)
    3. In command prompt
       Retrieve an authentication token and authenticate your Docker client to your registry.
       aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 012109323379.dkr.ecr.us-east-1.amazonaws.com

       Note: For this to work aws cli 2 should be configured

    4. docker tag inceptionv3-feature-extract-image:latest 012109323379.dkr.ecr.us-east-1.amazonaws.com/inceptionv3-feature-extract-image:latest

    5. Push the image to AWS ECR
        docker push 012109323379.dkr.ecr.us-east-1.amazonaws.com/inceptionv3-feature-extract-image:latest