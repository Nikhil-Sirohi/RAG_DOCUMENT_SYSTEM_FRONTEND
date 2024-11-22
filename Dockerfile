# Use a Node.js image to build the frontend
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Build the React application
RUN npm run build


EXPOSE 3000

CMD ["npm", "start"]