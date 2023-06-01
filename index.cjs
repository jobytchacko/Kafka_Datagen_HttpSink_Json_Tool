/**
 * TODO(developer): Uncomment and replace these variables before running the sample.
 */
const projectId = 'ecstatic-cosmos-387220';

// import  Compute from '@google-cloud/compute';
const { InstancesClient } = require('@google-cloud/compute');

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



const computevm = new InstancesClient();
const zone = computevm.zone('your-zone'); // Replace 'your-zone' with your desired zone, e.g., 'us-central1-a'

const vmConfig = {
  name: 'node-vm', // Replace 'your-vm-name' with your desired VM name
  machineType: 'n1-standard-1', // Replace 'your-machine-type' with the desired machine type, e.g., 'n1-standard-1'
  disks: [
    {
      boot: true,
      initializeParams: {
        sourceImage: 'projects/debian-cloud/global/images/debian-10-buster-v20220929', // Replace 'your-image' with the desired image, e.g., 'projects/debian-cloud/global/images/debian-10-buster-v20220929'
      },
    },
  ],
};

async function createVM() {
  try {
    const [vm] = await zone.createVM(vmConfig);
    console.log(`VM created successfully: ${vm.name}`);
  } catch (err) {
    console.error('Error creating VM:', err);
  }
}

createVM();

