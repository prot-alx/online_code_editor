FROM node:18

# Base utilities
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*


# Python
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    && ln -s /usr/bin/python3 /usr/bin/python \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Golang
RUN apt-get update && apt-get install -y \
    golang \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# # C++
# RUN apt-get update && apt-get install -y \
#     g++ \
#     && apt-get clean \
#     && rm -rf /var/lib/apt/lists/*

# # Java
# RUN apt-get update && apt-get install -y \
#     default-jdk \
#     && apt-get clean \
#     && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]