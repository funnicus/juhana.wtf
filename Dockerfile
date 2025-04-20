FROM node:23-slim

EXPOSE 4173

WORKDIR /usr/src/app

# Copy all of the content from the project to the image
COPY . .

RUN npm i
RUN npm run build

# And finally the command to run the application
CMD ["npm", "run", "preview"]