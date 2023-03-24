FROM node:14-alpine
WORKDIR /frontend
COPY . .
RUN npm install yarn
RUN yarn install
RUN yarn run build
