FROM node:lts
RUN apt-get update && \
    apt-get install -y \
    git \
    tor \
    curl \
    ffmpeg
RUN rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY ./frontend /app/frontend
WORKDIR /app/frontend
RUN yarn install && yarn build
CMD ["yarn", "start"]