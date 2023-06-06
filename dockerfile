FROM ubuntu:18.04
RUN apt update
RUN apt upgrade -y
RUN apt install curl -y
RUN apt install docker.io -y
RUN service docker start
RUN service docker status
RUN apt install git -y
WORKDIR /app
RUN git clone https://github.com/Lithin87/Nodejs_Kafka.git /app
RUN docker run --rm  docker compose up
#RUN docker compose up
RUN npm install
CMD ["npm", "start"]




