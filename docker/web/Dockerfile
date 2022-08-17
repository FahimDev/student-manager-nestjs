FROM node:16-alpine

# Create app directory
WORKDIR /usr/app

EXPOSE 3000

CMD ["sh", "-c", "yarn install; yarn prisma:migrate; yarn prisma:seed; yarn start:dev"]