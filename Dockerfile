# Use a Node.js base image
FROM node:20.18.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json .
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Nuxt listens on (default is 3000)
EXPOSE 4010

# Start the Nuxt application in production mode
CMD ["npm", "run", "dev", "--", "--host"]