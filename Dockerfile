# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json AND package-lock.json to leverage Docker cache
COPY package*.json ./

# Clean the npm cache and run a clean install to ensure all dependencies are fetched
RUN npm cache clean --force && npm install

# Copy the rest of the application's source code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]