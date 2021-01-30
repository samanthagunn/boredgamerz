FROM node:15.7.0-buster-slim 
ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN  npm i -g serve & npm i --production & npm run build 
CMD ["serve", "-s", "build"]