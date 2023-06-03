FROM ubuntu:20.04-alpine
WORKDIR /app
RUN DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker} 
RUN mkdir -p $DOCKER_CONFIG/cli-plugins
RUN curl -SL https://github.com/docker/compose/releases/download/v2.18.1/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
RUN apk add --no-cache git
RUN git clone https://github.com/Lithin87/reactstudy.git /app
RUN npm install
CMD ["npm", "start"]




