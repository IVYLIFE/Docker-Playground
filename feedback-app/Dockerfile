# This file is used to build the Docker image for the feedback app

# Use the official Node.js image as the base image
FROM node

# Set the working directory in the container
WORKDIR /feedbackApp

# Copy the package.json file in the container
COPY package.json .

# Install all dependencies
RUN npm install

# Copy all files in the container
COPY . .

# Set the default port for the server
ARG DEFAULT_PORT 80

# Set the environment variable for the port
ENV PORT=$DEFAULT_PORT

# Expose the port
EXPOSE $PORT

# Run the server
CMD [ "npm", "start" ]



