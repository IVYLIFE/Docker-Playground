# Use the official image as a parent image
FROM node

#  Set the working directory
WORKDIR /goalApp

# Copy the current directory contents into the container at /nodeApp
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# Make port 80 available to the world outside this container
EXPOSE 80

# Run server.js when the container launches
CMD [ "node", "server.js" ]
