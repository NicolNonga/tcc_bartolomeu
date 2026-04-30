FROM node:22-alpine

WORKDIR /home/node/tcc_app

RUN apk add --no-cache bash git

COPY tcc_app/package*.json ./

RUN npm install

COPY tcc_app/ .

EXPOSE 3333

COPY scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
