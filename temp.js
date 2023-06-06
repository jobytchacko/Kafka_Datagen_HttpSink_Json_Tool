import {InstancesClient } from  '@google-cloud/compute';
import  {auth} from 'google-auth-library';


const instanceName = 'robot-name5';
const zone = 'us-central1-a';
const projectId = 'ecstatic-cosmos-387220';
const sourceInstanceTemplate = `ubuntu-med`;

// List all instances in the specified project.
async function listAllInstances() {
  const instancesClient = new Compute.InstancesClient();

  //Use the `maxResults` parameter to limit the number of results that the API returns per response page.
  const aggListRequest = instancesClient.aggregatedListAsync({
    project: projectId,
    maxResults: 5,
  });

  console.log('Instances found:');

  // Despite using the `maxResults` parameter, you don't need to handle the pagination
  // yourself. The returned object handles pagination automatically,
  // requesting next pages as you iterate over the results.
  for await (const [zone, instancesObject] of aggListRequest) {
    const instances = instancesObject.instances;

    if (instances && instances.length > 0) {
      console.log(` ${zone}`);
      for (const instance of instances) {
        console.log(` - ${instance.name} (${instance.machineType})`);
      }
    }
  }
}

// listAllInstances();



async function createVMWithDocker(projectId, zone, instanceName) {

  const client = await auth.getClient({  scopes: 'https://www.googleapis.com/auth/cloud-platform' });
  

  const request = {
    projectId,
    zone,
    resource: {
      name: instanceName,
      machineType: `zones/${zone}/machineTypes/n1-standard-1`,
      disks: [
        {
          initializeParams: {
            sourceImage:
              'projects/ubuntu-os-cloud/global/images/family/ubuntu-2004-lts',
          },
          boot: true,
          autoDelete: true,
        },
      ],
      networkInterfaces: [
        {
          network: 'global/networks/default',
          accessConfigs: [
            {
              name: 'External NAT',
              type: 'ONE_TO_ONE_NAT'
            }
          ]
        }
      ],
      metadata: {
        items: [
          {
            key: 'startup-script',
            value: `
              #!/bin/bash
              apt-get update
              apt-get install -y docker.io
              sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              sudo chmod +x /usr/local/bin/docker-compose
              sudo usermod -aG docker $USER
              sudo service docker start
            `,
          },
        ],
      },
      serviceAccounts: [
        {
          email: 'default',
          scopes: ['https://www.googleapis.com/auth/cloud-platform']
        }
      ]
    }
  };


  const computeClient = new InstancesClient();
  const response = await computeClient.insert(resource);
  console.log('VM creation response:', response.data);
}




createVMWithDocker(projectId, zone, instanceName)
  .then(() => {
    console.log('VM creation completed.');
  })
  .catch((err) => {
    console.error('Error creating VM:', err);
  });

