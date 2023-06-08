import {InstancesClient , ZoneOperationsClient } from  '@google-cloud/compute';
import  {auth} from 'google-auth-library';

const project = 'ecstatic-cosmos-387220';
const zone = 'us-central1-a'
const instanceName = 'Kafka_VM'
const machineType = 'e2-standard-2';
const sourceImage = 'projects/debian-cloud/global/images/family/debian-11';

const authClient = await auth.getClient({  scopes: 'https://www.googleapis.com/auth/cloud-platform' });
const instancesClient = new InstancesClient();

 export async function createInstance() {

  console.log(`Creating the ${instanceName} instance in ${zone}...`);

  const [response] = await instancesClient.insert({
    instanceResource: {
      name: instanceName,
      disks: [
        {
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
              sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              sudo chmod +x /usr/local/bin/docker-compose
              sudo git clone https://github.com/Lithin87/Nodejs_Kafka.git /home/ravindcable4/app 
              sudo mv /home/ravindcable4/app/docker-compose.yml /home/ravindcable4/docker-compose.yml
              sudo cd /home/ravindcable4 && docker-compose up -d
            `,
          },
        ],
      },
    },
    auth: authClient,
    project,
    zone,
  });

  console.log(response);
  let operation = response.latestResponse;
  const operationsClient = new ZoneOperationsClient();

  // Wait for the create operation to complete.
  while (operation.status !== 'DONE') {
    [operation] = await operationsClient.wait({
      operation: operation.name,
      project,
      zone: operation.zone.split('/').pop(),
    });
  }

  console.log('Instance created.');
}



export async function deleteInstance() {
    const [response] = await instancesClient.delete({
        auth: authClient,
        project,
        zone,
        instance: instanceName
    }).then( console.log("VM Deleted : "+instanceName));
}



export async function getIPAddress() {
  console.log("Getting IP Address..");
  const computeClient = new InstancesClient();
  const the_compute_instance = await computeClient.get({instance: instanceName, project , zone: zone});
  const connection = await the_compute_instance[0];
  console.log(connection.name);
  return the_compute_instance[0]["networkInterfaces"][0]["accessConfigs"][0]["natIP"]

}


// getIPAddress().then(a => console.log(a));


// module.exports = {
//     deleteInstance,
//     createInstance,
//     getIPAddress
//   };



