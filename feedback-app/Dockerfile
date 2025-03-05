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

# Expose the port 80
EXPOSE 80

# Run the server
CMD [ "node", "server.js" ]
