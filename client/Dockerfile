FROM node:15.3.0-buster-slim 
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*","./"]
RUN npm install --production && npm install -g serve
COPY . .
RUN npm run build
CMD ["serve", "-s", "build"]

