FROM tensorflow/tensorflow

# Copy dependency file to docker image
COPY ./environment.yml .

LABEL Amazon AI <sage-learner@amazon.com>

RUN apt-get -y update && apt-get install -y --no-install-recommends \
         wget \
         python3 \
         nginx \
         ca-certificates \
         build-essential \
         git \
         curl \
         libgl1-mesa-glx \
         python-qt4 &&\
         rm -rf /var/lib/apt/lists/* && \
		 apt-get clean

RUN wget https://bootstrap.pypa.io/get-pip.py && python get-pip.py && \
    pip3 install numpy flask gevent gunicorn Pillow opencv-python && \
        rm -rf /root/.cache

# Set some environment variables. PYTHONUNBUFFERED keeps Python from buffering our standard
# output stream, which means that logs can be delivered to the user quickly. PYTHONDONTWRITEBYTECODE
# keeps Python from writing the .pyc files which are unnecessary in this case. We also update
# PATH so that the train and serve programs are found when the container is invoked.
ENV PYTHONUNBUFFERED=True
ENV PYTHONDONTWRITEBYTECODE=True
ENV PATH="/opt/program:${PATH}"

# Set up the program in the image
COPY inference_core /opt/program
WORKDIR /opt/program

RUN chmod 755 /opt/program
RUN chmod 755 serve
