# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle your app source
COPY . .

COPY wait-for.sh /usr/wait-for.sh
RUN chmod +x /usr/wait-for.sh

# Expose the port your app runs on
EXPOSE 3000

# Define environment variables
ENV PGHOST=postgres
ENV PGUSER=yourusername
ENV PGPASSWORD=yourpassword
ENV PGDATABASE=yourdatabase
ENV PGPORT=5432

# Wait-for utility to wait for the PostgreSQL container to be ready
COPY wait-for.sh /usr/wait-for.sh
RUN chmod +x /usr/wait-for.sh

# Command to run your application
CMD ["/usr/wait-for.sh", "postgres:5432", "--", "npm", "start"]
