const Compute = require('@google-cloud/compute');

const projectId = 'ecstatic-cosmos-387220';


// const vmConfig = {
//   name: 'node-vm', // Replace 'your-vm-name' with your desired VM name
//   machineType: 'n1-standard-1', // Replace 'your-machine-type' with the desired machine type, e.g., 'n1-standard-1'
//   disks: [
//     {
//       boot: true,
//       initializeParams: {
//         sourceImage: 'projects/debian-cloud/global/images/debian-10-buster-v20220929', // Replace 'your-image' with the desired image, e.g., 'projects/debian-cloud/global/images/debian-10-buster-v20220929'
//       },
//     },
//   ],
// };

async function createVM() {
  try {

    const {InstancesClient} = require('@google-cloud/compute').v1;
    const computeClient = new InstancesClient();
    const the_compute_instance = await computeClient.get({instance: "lithin", project: projectId , zone: "us-central1-a"})
    const public_ip = the_compute_instance[0]["networkInterfaces"][0]["accessConfigs"][0]["natIP"]
    console.log(public_ip)



//     const zone = new ZonesClient();
// const zone = computevm.cr('your-zone'); // Replace 'your-zone' with your desired zone, e.g., 'us-central1-a'
// const compute = new Compute();
// const zone1 = compute.zone('fdfdg');


  } catch (err) {
    console.error('Error creating VM:', err);
  }
}

createVM();




