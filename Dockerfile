FROM node:lts-alpine
RUN apk update && \
    apk add --no-cache \
    git \
    tor \
    curl \
    ffmpeg
RUN npm install -g yarn --force
WORKDIR /app
COPY . /app
RUN yarn remake && yarn frontend:build
CMD ["yarn", "frontend:start"]
