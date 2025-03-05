# Description: Dockerfile for the backend of the BMI calculator application

# Use the official Node.js image as the base image
FROM node

# Set the working directory in the container
WORKDIR /bmi-calculator-backend

# Copy the package.json file into the container at /bmi-calculator-backend
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the current directory contents into the container at /bmi-calculator-backend
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["node", "server.js"]
