import https from 'https';

const url = 'https://corsproxy.io/?https://wakatime.com/api/v1/users/current/stats/last_7_days';
const encodedKey = Buffer.from('waka_cec9d646-871e-4ab8-bfdb-bd26807d7302').toString('base64');

const options = {
  method: 'GET',
  headers: {
    'Authorization': `Basic ${encodedKey}`
  }
};

const req = https.request(url, options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(data.substring(0, 200));
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();
