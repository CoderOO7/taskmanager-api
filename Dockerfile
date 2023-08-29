FROM node:16

# setting default NODE_ENV
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Set the working directory to /app
WORKDIR /app

# copy package.json into the container at /app
COPY package*.json /app/

# install dependencies
RUN npm ci --omit=optional && npm cache clean --force

# Copy the current directory contents into the container at /app
COPY . /app/

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD npm run start:${NODE_ENV}
