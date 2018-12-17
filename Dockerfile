FROM node:11.4

# Create app directory
WORKDIR /usr/src/app


# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build and optimize react app
RUN npm run build

EXPOSE 3000

# defined in package.json
CMD [ "npm", "run", "start:server" ]
