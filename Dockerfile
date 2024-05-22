FROM node:lts

# Update package lists and install dependencies
RUN apt-get update && \
    apt-get install -y \
    git \
    tor \
    curl \
    ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the local repository into the Docker image
COPY . .

# Install yarn globally and run yarn remake
RUN npm install -g yarn --force && \
    yarn remake

# Define the command to run the application
CMD ["yarn", "frontend:start"]
