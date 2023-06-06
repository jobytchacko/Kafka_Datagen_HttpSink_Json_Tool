// const auth = require('google-auth-library');
// const compute = require('@google-cloud/compute');

import {InstancesClient , ZoneOperationsClient } from  '@google-cloud/compute';
import  {auth} from 'google-auth-library';


const projectId = 'ecstatic-cosmos-387220';
const zone = 'us-central1-a'
const instanceName = 'robot1'
const machineType = 'e2-standard-2';
const sourceImage = 'projects/debian-cloud/global/images/family/debian-11';
const networkName = 'global/networks/default';


// Create a new instance with the values provided above in the specified project and zone.
async function createInstance() {
  const instancesClient = new InstancesClient();
  const authClient = await auth.getClient({  scopes: 'https://www.googleapis.com/auth/cloud-platform' });

  console.log(`Creating the ${instanceName} instance in ${zone}...`);

  const [response] = await instancesClient.insert({
    instanceResource: {
      name: instanceName,
      disks: [
        {
          // Describe the size and source image of the boot disk to attach to the instance.
          initializeParams: {
            diskSizeGb: '15',
            sourceImage,
          },
          autoDelete: true,
          boot: true,
          type: 'SSD',
        },
      ],
      machineType: `zones/${zone}/machineTypes/${machineType}`,
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
              sudo apt update
              sudo apt install -y docker.io
              sudo mkdir -p /home/ravindcable4/.docker/cli-plugins
              sudo curl -SL https://github.com/docker/compose/releases/download/v2.18.1/docker-compose-linux-x86_64 -o /home/ravindcable4/.docker/cli-plugins/docker-compose
              sudo chmod +x /home/ravindcable4/.docker/cli-plugins/docker-compose
              sudo git clone https://github.com/Lithin87/Nodejs_Kafka.git /home/ravindcable4/app
              sudo /home/ravindcable4/.docker/cli-plugins/docker-compose up
            `,
          },
        ],
      },
    },
    auth: authClient,
    project: projectId,
    zone,
  });
  let operation = response.latestResponse;
  const operationsClient = new ZoneOperationsClient();

  // Wait for the create operation to complete.
  while (operation.status !== 'DONE') {
    [operation] = await operationsClient.wait({
      operation: operation.name,
      project: projectId,
      zone: operation.zone.split('/').pop(),
    });
  }

  console.log('Instance created.');
}

createInstance();