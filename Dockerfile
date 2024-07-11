# BUILDER IMAGE
FROM node:20.15.1 AS builder

# Create app working directory
WORKDIR /home/node/app

# Install dependencies
COPY package*.json ./
RUN npm ci --ignore-scripts

# Copy source code and build files
COPY ./src/ ./src/
COPY tsconfig.json .

# Build app
RUN npm run build


# PRODUCTION IMAGE
FROM node:20.15.1

# Create app working directory
WORKDIR /home/node/app

# Install production dependencies
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# Copy build
COPY --from=builder /home/node/app/dist ./dist

# Expose port
EXPOSE 8080

ENTRYPOINT ["npm", "start"]
