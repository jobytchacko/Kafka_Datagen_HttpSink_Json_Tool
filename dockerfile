FROM node
RUN apt update
RUN apt upgrade -y
RUN apt install curl -y
RUN apt install docker.io -y
COPY --from=docker/compose-bin:2.17.0 /docker-compose /usr/bin/compose
RUN apt install git -y
WORKDIR /app
RUN git clone https://github.com/Lithin87/Nodejs_Kafka.git /app
RUN docker compose up
RUN npm install
CMD ["npm", "start"]




