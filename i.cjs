const {InstancesClient } = require('@google-cloud/compute').v1;
const {auth} = require('google-auth-library');
import {$} from 'execa';


const name = 'a-name4';
const zone = 'us-central1-a';
const projectId = 'ecstatic-cosmos-387220';
const sourceInstanceTemplate = `ubuntu-med`;


async function createVM(zone, vmName, templateName) {
  const client = await auth.getClient({  scopes: 'https://www.googleapis.com/auth/cloud-platform' });
  
  const sourceInstanceTemplate = `projects/${projectId}/global/instanceTemplates/${templateName}`;
  const url = `https://www.googleapis.com/compute/v1/projects/${projectId}/zones/${zone}/instances?sourceInstanceTemplate=${sourceInstanceTemplate}`;
  
  return await client.request({  url: url,  method: 'post',  data: {name: vmName} });
}

async function getIPAddress() {
    const computeClient = new InstancesClient();
    const the_compute_instance = await computeClient.get({instance: name, project: projectId , zone: zone});
    return the_compute_instance[0]["networkInterfaces"][0]["accessConfigs"][0]["natIP"]

}

createVM(zone, name, sourceInstanceTemplate).then( a => {

  console.log("-------------------------------------------------------------");
  getIPAddress().then(a => console.log(a)).catch(console.error)
  
 } ).catch(console.error);


 const branch = await $`git branch --show-current`;
 await $`dep deploy --branch=${branch}`;