# Use the official Playwright image as a base
FROM mcr.microsoft.com/playwright:v1.39.0-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install Playwright browsers
RUN npx playwright install

# Command to run tests
CMD ["npx", "playwright", "test", "tests/api-test.spec.js"]
