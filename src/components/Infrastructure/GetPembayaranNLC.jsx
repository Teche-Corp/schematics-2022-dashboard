import axios from 'axios';

class GetPembayaranNLC {
  static async request(usename, password, callback = (response) => {}) {
    await axios({
      method: 'get',
      headers: {
        'App-Key': process.env.PUBLIC_URL,
        usename: usename,
        password: password,
      },
      url: `/admin_get_list_pembayaran_nlc`,
      params: {},
    }).then(
      (response) => {
        console.log(`responsenya :`, response);
        callback(response);
      },
      (error) => {
        console.log(`error`, error);
      },
    );
  }
}

export default GetPembayaranNLC;
