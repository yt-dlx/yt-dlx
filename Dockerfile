FROM node:lts

# Update package lists and install dependencies
RUN apt-get update && \
    apt-get install -y \
    git \
    tor \
    curl \
    ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# Clone the repository
RUN git clone https://github.com/yt-dlx/yt-dlx.git

# Set the working directory
WORKDIR /yt-dlx

# Install yarn globally and run yarn remake
RUN npm install -g yarn --force && \
    yarn remake

# Define the command to run the application
CMD ["yarn", "frontend:start"]
