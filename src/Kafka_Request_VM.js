import { InstancesClient, ZoneOperationsClient } from '@google-cloud/compute';
import { auth } from 'google-auth-library';

const project = 'cloudtest-396310';
const zone = 'us-central1-a'
const instanceName = 'kafkavm'
const machineType = 'e2-standard-4';
const sourceImage = 'projects/debian-cloud/global/images/family/debian-11';
const machineImage = 'projects/cloudtest-396310/global/machineImages/mimic-data-framework-ust'; 

process.env.GOOGLE_APPLICATION_CREDENTIALS = 'gcloud.json';
const authClient = await auth.getClient({ scopes: 'https://www.googleapis.com/auth/cloud-platform' });
const instancesClient = new InstancesClient();

global.ips = "";
await getIPAddress().catch(m => { console.log("\nVM is NOT created : \n") } )

export async function createInstance() {
  
  console.log(`\n\nCreating =>\nINSTANCE : ${instanceName} \nZONE     : ${zone}`);

  const [response] =  await instancesClient.insert({
    instanceResource: {
      name: instanceName,
      sourceMachineImage: machineImage,
      metadata: {
        items: [
          {
            key: 'startup-script',
            value: `
              #!/bin/bash
              git clone https://github.com/Lithin87/Kafka_Datagen_HttpSink_Json_Tool.git /home/ravindcable5/app
              cd /home/ravindcable5/app/Resources && docker-compose up `,
          },
        ],
      },
    },
    auth: authClient,
    project,
    zone,
  });

  await waitOperation(response);
  await getIPAddress().catch(m => { console.log("\nVM is NOT created : \n") } )
  console.log('Instance created.');
  return 'Instance created.';
}



async function waitOperation(response) {
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
}

export async function deleteInstance() {
  const [response] = await instancesClient.delete({
    auth: authClient,
    project,
    zone,
    instance: instanceName
  }).catch( e => {console.log('Error : VM already deleted\n'+e);return 'VM Deleted' });
  await waitOperation(response);
  ips = "";
  console.log('VM Deleted ');
  return 'VM Deleted';
}


export async function getIPAddress() {
  const computeClient = new InstancesClient();
  const instances = await computeClient.get({ instance: instanceName, project, zone: zone });
  const ipAddress = instances[0]["networkInterfaces"][0]["accessConfigs"][0]["natIP"]
  const ConnectorBaseUrl = 'http://' + ipAddress + ':8083';
  const ClusterUrl = 'http://' + ipAddress + ':9021';
  const SchemaRegistryUrl = 'http://' + ipAddress + ':8081';
  const BrokerUrl = 'http://' + ipAddress + ':9101';
  global.ips = [ConnectorBaseUrl, ClusterUrl, SchemaRegistryUrl, BrokerUrl];
}


