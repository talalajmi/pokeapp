# Use an official Node.js 18 image as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only package.json and bun.lockb (if exists) to leverage Docker cache
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install

# Copy the rest of your application's code
COPY . .

# Build your Next.js application
RUN yarn build

# Inform Docker that the container listens on port 3000
EXPOSE 3000

# Command to run your application
CMD ["yarn", "start"]
