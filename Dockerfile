FROM node:20-alpine

# Install OpenSSL and other dependencies
RUN apk add --no-cache openssl

# Create application directory
RUN mkdir -p /home/node/appexpo && chown -R node:node /home/node/appexpo

# Set user to "node"
USER node

# Set the working directory
WORKDIR /home/node/appexpo

# Set environment variables
ENV DATABASE_URL="file:./dev.db"
ENV NODE_ENV production
ENV PORT=5500

# Copy project files
COPY --chown=node:node . .

# Install dependencies
RUN npm install

# Write environment variables to .env file
RUN echo "DATABASE_URL=$DATABASE_URL" >> .env
RUN echo "PORT=$PORT" >> .env

# Expose application port
EXPOSE ${PORT}

# Default user remains "node"
USER node
