FROM node:latest
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    git \
    tor \
    curl \
    ffmpeg \
    nodejs \
    python3 \
    python3-pip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
RUN npm i -g yarn yt-dlx --force
WORKDIR /app
COPY ./frontend /app
RUN yarn install && yarn frontend:build 
CMD ["yarn", "frontend:start"]
