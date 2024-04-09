# pull official base image
FROM node:18-alpine

# set working directory
WORKDIR /usr/src/Music_March_Madness_App

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/Music_March_Madness_App/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install react-scripts@5.0.1 -g --silent
RUN npx update-browserslist-db@latest
# start app
CMD ["npm", "start"]