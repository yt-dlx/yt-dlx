FROM node:lts-alpine
RUN apk update && \
    apk add --no-cache \
    git \
    tor \
    curl \
    ffmpeg
RUN npm install -g yarn --force
WORKDIR /app
COPY ./frontend /app
RUN yarn install && \
    yarn build
CMD ["yarn", "start"]
