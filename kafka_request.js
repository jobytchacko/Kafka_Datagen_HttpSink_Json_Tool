import  gaxios , {request} from 'gaxios';

// let config = {
//   method: 'get',
//   maxBodyLength: Infinity,
//   url: 'http://34.125.110.96:8083/connector-plugins',
//   headers: { }
// };

// axios.request(config)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });


gaxios.instance.defaults = {
  baseURL: 'http://104.197.189.100:8083',
  headers: {
    // Authorization: 'SOME_TOKEN'
  }
}
request({url: '/connector-plugins'}).then((response) => console.log(response.data) );