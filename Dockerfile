FROM node:alpine as base

WORKDIR /app
COPY package.json yarn.lock tsconfig.json ./
RUN rm -rf node_modules && yarn install --frozen-lockfile && yarn cache clean

COPY . .

ENV NODE_ENV=production

RUN npm run build

# RUN npm run start
EXPOSE 3030

CMD ["npm", "run", "start"]

# $ docker build --tag ts-express:test .
# docker run -it ts-express:test
