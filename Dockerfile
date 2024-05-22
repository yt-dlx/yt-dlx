FROM node:lts

# Update package lists and install necessary packages
RUN apt-get update && \
    apt-get install -y \
    git \
    tor \
    curl \
    ffmpeg

# Clean up the apt cache to reduce image size
RUN rm -rf /var/lib/apt/lists/*

# Install yarn globally
RUN npm install -g yarn

# Set the working directory
WORKDIR /app

# Copy the frontend files to the container
COPY ./frontend /app/frontend

# Set the working directory to the frontend folder
WORKDIR /app/frontend

# Build the frontend
RUN yarn build

# Define the command to run the frontend
CMD ["yarn", "start"]
