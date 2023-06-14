import gaxios , {request} from 'gaxios';
import jp from 'jsonpath';
import Kafka from 'node-rdkafka';
import {  getIPAddress } from  './VM_Manager.js';
import ld from 'lodash';


const adminClient = Kafka.AdminClient.create({
  'client.id': 'kafka-admin',
  'metadata.broker.list': '104.197.189.100:9101',
  'socket.timeout.ms': 5000, 
});

 
  
gaxios.instance.defaults = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': ['application/json']
  }
}

let pre_template = JSON.stringify({
  "name": "Datagen_pre_template",
  "config": {
    "connector.class": "io.confluent.kafka.connect.datagen.DatagenConnector",
    "name": "Datagen_pre_template",
    "schema.string": "{\"connect.name\":\"lithin.personal.ust_data\",\"fields\":[{\"name\":\"Name\",\"type\":{\"type\":\"string\",\"arg.properties\":{\"regex\":\"User_[1-9]{0,1}\"}}},{\"name\":\"office\",\"type\":\"string\"},{\"name\":\"user_id\",\"type\":\"string\"},{\"name\":\"employee_id\",\"type\":\"long\"},{\"name\":\"cubicle_num\",\"type\":\"int\"}],\"name\":\"ust_data\",\"namespace\":\"lithin.personal\",\"type\":\"record\"}",
    "tasks.max": "1",
    "kafka.topic": "Template_Schema"
  }
});

let file_schema = JSON.stringify({
  "name": "Datagen_file_schema",
  "config": {
    "connector.class": "io.confluent.kafka.connect.datagen.DatagenConnector",
    "name": "Datagen_file_schema",
    "schema.string": "{\"connect.name\":\"lithin.personal.ust_data\",\"name\":\"ust_data\",\"namespace\":\"lithin.personal\",\"type\":\"record\",\"fields\":[{\"name\":\"store_id\",\"type\":{\"type\":\"int\",\"arg.properties\":{\"range\":{\"min\":1,\"max\":100}}}},{\"name\":\"order_lines\",\"type\":{\"type\":\"array\",\"items\":{\"name\":\"order_line\",\"type\":\"record\",\"fields\":[{\"name\":\"product_id\",\"type\":{\"type\":\"int\",\"arg.properties\":{\"range\":{\"min\":1,\"max\":100}}}},{\"name\":\"category\",\"type\":{\"type\":\"string\",\"arg.properties\":{\"regex\":\"User_[1-9]{0,1}\"}}},{\"name\":\"quantity\",\"type\":{\"type\":\"int\",\"arg.properties\":{\"range\":{\"min\":1,\"max\":100}}}},{\"name\":\"unit_price\",\"type\":{\"type\":\"float\",\"arg.properties\":{\"range\":{\"min\":0.1,\"max\":10}}}},{\"name\":\"net_price\",\"type\":{\"type\":\"float\",\"arg.properties\":{\"range\":{\"min\":0.1,\"max\":10}}}}]},\"arg.properties\":{\"length\":{\"min\":1,\"max\":5}}}}]}",
    "tasks.max": "1",
    "kafka.topic": "Regex_Schema"
  }
});

// const path = '$.address.city';
// const newValue = 'San Francisco';



// lodash.set(data, ['config', 'schema.string'], 'Jane Smith');


const schema_replace = (schema) => {  if( schema != null) { file_schema = JSON.parse(file_schema); jp.set(file_schema, ['config', 'schema.string'], schema); console.log(file_schema); }  return file_schema}

let ConnectorBaseUrl;

const  del_connectors = (a) => { request({ url: a+'/connectors' }).then((response) => {
  if ( response.data.length  == 0)
  {console.log("No Connectors present")}
  else{
  response.data.forEach((element) => {
      request({ url: a+`/connectors/${element}`, method: 'delete' }).then(console.log(element + " : DELETED"));
  })}
})}


// Example request objects
const req0 = () => {getIPAddressURL().then(a => { request({ url: a+'/connector-plugins' }).then(printData)  })}
const req1 = (schema) => {getIPAddressURL().then(a => { request({ url: a+'/connectors', method: 'POST', data: pre_template }).then(printData).catch(printError) })}
const req2 = (schema) => {getIPAddressURL().then(a => { request({ url: a+'/connectors', method: 'POST', data: schema_replace(schema) }).then(printData).catch(printError) })}
const req3 = () => {getIPAddressURL().then(a => { del_connectors(a) }   )}
const req4 = (schema) => {getIPAddressURL().then(a => { request({ url: '/connector-plugins/DatagenConnector/config/validate', data: schema, method: 'put' }).then((res) => console.log(res.data)).catch(printError) })}
const req5 =  () => {   getUserInput().then(printData).catch(printError) };
// const request6 = () => { method: 'POST', url: 'https://example.com/api/data2', body: { name: 'John', age: 30 } };
// const request7 = () => { method: 'POST', url: 'https://example.com/api/data2', body: { name: 'John', age: 30 } };
// const request8 = () => { method: 'POST', url: 'https://example.com/api/data2', body: { name: 'John', age: 30 } };

;

export const requests = [req0, req1, req2, req3,req4, req5];


async function getIPAddressURL() {
  const ipAddress = await getIPAddress();
  const ConnectorBaseUrl = 'http://' + ipAddress + ':8083';
  const RestBaseUrl = 'http://' + ipAddress + ':8082';
  console.log(ConnectorBaseUrl)
  return ConnectorBaseUrl;
}

const printError = (response) => { 
    console.log("hii"+response);
    let msg = jp.query(response, "$..response.data.message");
   if( msg.length != 0) 
      console.dir(msg)
      else
      console.log("Containers aren't up..Either start the containers or Wait")}

const printData = (response) => { 
     console.log(jp.query(response, "$..statusText",1)) ; 
//  console.dir(JSON.stringify(response), { depth : null}) 
 }



  





