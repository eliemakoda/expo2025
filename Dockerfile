FROM node:20-alpine

RUN mkdir -p /home/node/appexpo && chown -R node:node /home/node/appexpo

USER node

WORKDIR /home/node/appexpo

ENV DATABASE_URL="file:./dev.db"

COPY --chown=node:node . .

RUN npm install

RUN echo "DATABASE_URL=$DATABASE_URL" >> .env

# RUN npx prisma migrate dev --name init

# RUN npx prisma generate

ENV NODE_ENV production

ENV PORT=5500

RUN echo "PORT=$PORT" >> .env

USER node

# RUN npx prisma migrate dev --name init

# RUN npx prisma generate

EXPOSE ${PORT}


