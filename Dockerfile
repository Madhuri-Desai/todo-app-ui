FROM node:16-alpine as builder

WORKDIR /todo-app

# copy the package.json to install dependencies
COPY package.json ./

RUN npm config set strict-ssl false

# Install the dependencies and make the folder
RUN npm install

COPY . .

# Build the project and copy the files
RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /todo-app/build /usr/share/nginx/html

RUN chmod 644 /usr/share/nginx/html/favicon.ico
RUN chmod 644 /usr/share/nginx/html/manifest.json


EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
