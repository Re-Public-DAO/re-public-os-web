FROM jitesoft/node-yarn:16

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ../../../package*.json ./

RUN yarn install

COPY ./ ./

CMD ["yarn", "dev"]
