import {InstancesClient } from  '@google-cloud/compute';
import { auth } from 'google-auth-library';
import {execa} from 'execa';


const name = 'robot-name1';
const zone = 'us-central1-a';
const projectId = 'ecstatic-cosmos-387220';
const sourceInstanceTemplate = `ubuntu-med`;

async function createVM(zone, vmName, templateName) {
  console.log("Creating VM..");
  const client = await auth.getClient({  scopes: 'https://www.googleapis.com/auth/cloud-platform' });
  
  const sourceInstanceTemplate = `projects/${projectId}/global/instanceTemplates/${templateName}`;
  const url = `https://www.googleapis.com/compute/v1/projects/${projectId}/zones/${zone}/instances?sourceInstanceTemplate=${sourceInstanceTemplate}`;
  
  return await client.request({   method: 'post', url: url,  data: {name: vmName} });
}

async function getIPAddress() {
    console.log("Getting IP Address..");
    const computeClient = new InstancesClient();
    const the_compute_instance = await computeClient.get({instance: name, project: projectId , zone: zone});
    return the_compute_instance[0]["networkInterfaces"][0]["accessConfigs"][0]["natIP"]

}

createVM(zone, name, sourceInstanceTemplate).then( a =>
  getIPAddress().then(a => console.log(a))
  
 ).catch(console.error);



// const {stdout} = await execa('echo', ['unicorns'])

// const {stdout} = await execa('docker', ['compose','up']);
// console.log(stdout);