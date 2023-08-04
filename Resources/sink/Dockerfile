FROM cnfldemos/cp-server-connect-datagen:0.5.3-7.1.0

# Install default JDK
#RUN apt-get update && apt-get install -y default-jdk

# Download and install Confluent Hub client
RUN curl -L "https://client.hub.confluent.io/confluent-hub-client-latest.tar.gz" -o hub.tar.gz \
    && tar -xzvf hub.tar.gz \
    && rm hub.tar.gz \
    && cd bin \
    && yes | ./confluent-hub install confluentinc/kafka-connect-http:1.7.2
