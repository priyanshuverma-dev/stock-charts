# Use the Ubuntu base image
FROM ubuntu:20.04

# Install dependencies
RUN apt-get update && \
    apt-get install -y curl unzip && \
    rm -rf /var/lib/apt/lists/*

# Install Fluvio
RUN curl -fsS https://hub.infinyon.cloud/install/install.sh?ctx=dc | bash

# Set the PATH
ENV PATH "$PATH:/root/.fluvio/bin"
ENV PATH "$PATH:/root/.fvm/bin"

# Copy any necessary scripts or files into the image
# COPY your-script.sh /path/in/container/

# Expose necessary ports for SC and SPU
EXPOSE 9003 9010 9011

# Create directories for volumes (if needed)
RUN mkdir -p /fluvio/metadata /fluvio/data

# Set up the entrypoint for SC and SPU
ENTRYPOINT /bin/sh -c "\
    ./fluvio-run sc --local /fluvio/metadata & \
    sleep 5 && \
    ./fluvio profile add docker sc:9003 docker && \
    ./fluvio cluster spu register --id 5001 -p 0.0.0.0:9110 -l 0.0.0.0:9010 --private-server 0.0.0.0:9011 && \
    ./fluvio-run spu -i 5001 -p 0.0.0.0:9010 -v 0.0.0.0:9011 --sc-addr 127.0.0.1:9004 --log-base-dir /fluvio/data && \
    wait"
