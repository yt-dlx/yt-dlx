FROM node:lts
RUN apt-get update && \
    apt-get install -y \
    git \
    tor \
    curl \
    ffmpeg && \
    rm -rf /var/lib/apt/lists/*
RUN npm install -g yarn --force
WORKDIR /app
COPY ./frontend /app/frontend
RUN yarn build
CMD ["yarn", "start"]