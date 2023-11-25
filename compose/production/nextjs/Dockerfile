FROM jitesoft/node-yarn:16

# Set the working directory in the container to /app
WORKDIR /app

RUN npm install --global pm2

# Copy package.json and package-lock.json to the working directory
COPY ../../../package*.json ./

RUN yarn install

COPY ./ ./

RUN yarn build

USER node

CMD [ "pm2-runtime", "yarn", "start" ]
