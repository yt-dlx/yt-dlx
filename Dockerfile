FROM node:lts

# Update package index and install dependencies
RUN apt-get update && \
    apt-get install -y \
    git \
    tor \
    curl \
    ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# Install yarn globally
RUN npm install -g yarn --force

# Set working directory
WORKDIR /app

# Copy application code
COPY . /app

# Run yarn commands to build the application
RUN yarn remake && \
    yarn frontend:build

# Set default command to start the frontend
CMD ["yarn", "frontend:start"]
