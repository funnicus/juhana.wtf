FROM node:18-slim

EXPOSE 3000

WORKDIR /usr/src/app

# Copy all of the content from the project to the image
COPY . .

RUN npm i

# And finally the command to run the application
CMD ["npm", "start"]