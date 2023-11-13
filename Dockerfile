# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR dist

# Copy the rest of the application code
COPY . .

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install application dependencies
RUN npm install


# Expose a port if your application listens on a specific port
EXPOSE 3000

# Command to run your application
CMD ["node", "index.js"]
