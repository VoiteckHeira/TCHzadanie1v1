# syntax=docker/dockerfile:1.4

FROM node:latest as build-stage 

ARG VERSION

WORKDIR /app 

COPY package*.json /app/ 

RUN npm install && npm install axios

COPY . . 

ENV REACT_APP_VERSION=${VERSION}

RUN npm run build


FROM nginx 

ARG VERSION

LABEL org.opencontainers.image.version="$VERSION"

COPY nginx.conf /etc/nginx/conf.d/default.conf 

COPY --from=build-stage /app/build /usr/share/nginx/html 

EXPOSE 8080

HEALTHCHECK --interval=10s --timeout=1s \
    CMD curl -f http://localhost:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
