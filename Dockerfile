FROM node:18

RUN apt-get update && apt-get install -y \
    curl \
    wget \
    python3 \
    python3-pip \
    golang \
    g++ \
    default-jdk \
    rustc \
    cargo \
    && ln -s /usr/bin/python3 /usr/bin/python \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "setup:prod"]

EXPOSE 3000