FROM ubuntu:18.04
WORKDIR /app
RUN DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker} 
RUN mkdir -p $DOCKER_CONFIG/cli-plugins
RUN apt update
RUN apt upgrade -y
RUN apt install curl -y
RUN curl -SL https://github.com/docker/compose/releases/download/v2.18.1/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
RUN apt install git -y
RUN git clone https://github.com/Lithin87/Nodejs_Kafka.git /app
RUN npm install
CMD ["npm", "start"]




