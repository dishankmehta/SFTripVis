FROM node:latest as builder

RUN mkdir -p /deploy/app
WORKDIR /deploy/app

COPY . /deploy/app
WORKDIR /deploy/app

RUN npm install -g yarn && npm cache clean --force
RUN yarn install --silent && yarn cache clean --force
ENV PATH /deploy/app/node_modules/.bin:$PATH

RUN yarn build

FROM nginx:latest
RUN rm -rf /etc/nginx/conf.d
COPY ./deployment_configs /etc/nginx
COPY --from=builder /deploy/app/build /usr/share/nginx/html
EXPOSE 5000
CMD ["nginx", "-g", "daemon off;"]

