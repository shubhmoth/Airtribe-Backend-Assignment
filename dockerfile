# Use the official Node.js 14 image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files to the working directory
COPY ./server .

# Expose the port your app runs on
EXPOSE 8080

# Command to run your app
CMD ["node", "index.js"]
