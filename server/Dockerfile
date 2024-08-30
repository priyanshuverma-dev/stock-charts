# Use the Ubuntu base image
FROM node:18

# Set the timezone environment variable to avoid the interactive prompt
ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install dependencies
RUN apt-get update && \
    apt-get install -y curl unzip tzdata && \
    rm -rf /var/lib/apt/lists/*

# Install Fluvio
RUN curl -fsS https://hub.infinyon.cloud/install/install.sh?ctx=dc | bash

# Set up environment variables in .bashrc
RUN echo 'export PATH="$HOME/.fluvio/bin:$HOME/.fvm/bin:$PATH"' >> ~/.bashrc && \
    echo 'source "${HOME}/.fvm/env"' >> ~/.bashrc

# Source .bashrc to ensure the environment variables are loaded
RUN /bin/bash -c "source ~/.bashrc"

# Ensure correct permissions for the Fluvio binaries
RUN chmod +x /root/.fluvio/bin/* /root/.fvm/bin/*

# Set the PATH (useful if running commands outside of an interactive shell)
ENV PATH="$PATH:/root/.fluvio/bin:/root/.fvm/bin"


# Set the working directory for your app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install -g bun


# Install Node.js dependencies
RUN bun install

# Copy the rest of your application code
COPY . .

# Copy the entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# Make the script executable
RUN chmod +x /usr/local/bin/entrypoint.sh

# Set the entrypoint
# Expose the port your app runs on
EXPOSE 3000


ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]


