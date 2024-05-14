# Use Node.js as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port that the Next.js app will run on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
