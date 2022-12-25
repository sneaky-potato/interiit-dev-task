FROM node:16-alpine AS build

ENV NODE_ENV production

LABEL maintainer="Ashwani Kumar Kamal (sneaky-potato) <ashwanikamal.im421@gmail.com>"

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:latest as production

ENV NODE_ENV production

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]