import {InstancesClient } from  '@google-cloud/compute';
import { auth } from 'google-auth-library';
import {execa} from 'execa';
import prompt  from 'prompt';
import lodash from 'lodash';

// const name = 'robot-name1';
// const zone = 'us-central1-a';
// const projectId = 'ecstatic-cosmos-387220';
// const sourceInstanceTemplate = `ubuntu-med`;

// async function createVM(zone, vmName, templateName) {
//   console.log("Creating VM..");
//   const client = await auth.getClient({  scopes: 'https://www.googleapis.com/auth/cloud-platform' });
  
//   const sourceInstanceTemplate = `projects/${projectId}/global/instanceTemplates/${templateName}`;
//   const url = `https://www.googleapis.com/compute/v1/projects/${projectId}/zones/${zone}/instances?sourceInstanceTemplate=${sourceInstanceTemplate}`;
  
//   return await client.request({   method: 'post', url: url,  data: {name: vmName} });
// }

// createVM(zone, name, sourceInstanceTemplate).catch(console.error);




let file_schema = JSON.stringify({
  "name": "Datagen_file_schema",
  "config": {
    "connector.class": "io.confluent.kafka.connect.datagen.DatagenConnector",
    "name": "Datagen_file_schema",
    "schema.string": "dffdf",
    "tasks.max": "1",
    "kafka.topic": "Regex_Schema"
  }
});

// const path = '$.config."schema.string"';





// const json = '{"first.name": "John", "last.name": "Doe"}';
const data = JSON.parse(file_schema);

lodash.set(data, ['config', 'schema.string'], 'Jane Smith');


console.log(data); // Output: Doe
