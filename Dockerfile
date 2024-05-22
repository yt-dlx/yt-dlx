FROM node:lts
RUN apt-get update && \
    apt-get install -y \
    git \
    tor \
    curl \
    ffmpeg && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY . .
RUN npm install -g yarn --force && \
    yarn remake
CMD ["yarn", "frontend:start"]
