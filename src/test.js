import {InstancesClient } from  '@google-cloud/compute';
import { auth } from 'google-auth-library';
import {execa} from 'execa';
import prompt  from 'prompt';

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




  prompt.start();


  prompt.get(['username', 'email'], function (err, result) {
  
    console.log('Command-line input received:');
    console.log('  username: ' + result.username);
    console.log('  email: ' + result.email);
  });

