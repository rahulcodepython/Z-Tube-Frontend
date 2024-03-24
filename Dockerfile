FROM node

WORKDIR /frontend

COPY public /frontend/public
COPY src /frontend/src
COPY .env.local /frontend/.env.local
COPY components.json /frontend/components.json
COPY jsconfig.json /frontend/jsconfig.json
COPY next.config.js /frontend/next.config.js
COPY package.json /frontend/package.json
COPY package-lock.json /frontend/package-lock.json
COPY postcss.config.js /frontend/postcss.config.js
COPY tailwind.config.js /frontend/tailwind.config.jsconfig

RUN npm install

RUN npm run build
