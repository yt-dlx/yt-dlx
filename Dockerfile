# FROM mcr.microsoft.com/playwright
FROM node:latest
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    git \
    tor \
    wget \
    curl \
    unzip \
    nginx \
    ffmpeg \
    nodejs \
    python3 \
    dos2unix \
    apt-utils \
    opus-tools \
    python3-pip \
    python3-venv \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
RUN npm i -g yarn yt-dlx --force
WORKDIR /app
COPY . .
RUN yarn remake
CMD yarn ui:start