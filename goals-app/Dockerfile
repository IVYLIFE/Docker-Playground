# Use the official image as a parent image
FROM node

#  Set the working directory
WORKDIR /goals-app

# Copy the current directory package.json into the container at /goalsApp
COPY package.json .

# Install any needed packages specified in package.json
RUN npm install

# Copy the current directory contents into the container at /goalsApp
COPY . .

ARG DEFAULT_PORT=3006
ENV PORT=${DEFAULT_PORT}  

# Make PORT available to the world outside this container
EXPOSE ${DEFAULT_PORT}

# Run server.js when the container launches
CMD [ "npm", "run", "dev" ]
