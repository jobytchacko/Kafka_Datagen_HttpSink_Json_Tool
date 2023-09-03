# This docker file Downloads and installs Confluent Hub client and the required connector plugins 

FROM cnfldemos/cp-server-connect-datagen:0.5.3-7.1.0
RUN curl -L "https://client.hub.confluent.io/confluent-hub-client-latest.tar.gz" -o hub.tar.gz \
    && tar -xzvf hub.tar.gz \
    && rm hub.tar.gz \
    && cd bin \
    && yes | ./confluent-hub install confluentinc/kafka-connect-http:1.7.2
