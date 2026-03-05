import https from 'https';

const apiKey = 'waka_cec9d646-871e-4ab8-bfdb-bd26807d7302';
const encodedKey = Buffer.from(apiKey).toString('base64');

const options = {
  hostname: 'wakatime.com',
  port: 443,
  path: '/api/v1/users/current/stats/last_7_days',
  method: 'GET',
  headers: {
    'Authorization': `Basic ${encodedKey}`
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    const parsed = JSON.parse(data);
    console.log("Total:", parsed.data.human_readable_total_including_other_language);
    console.log("Languages:", parsed.data.languages.slice(0, 3));
    console.log("Editors:", parsed.data.editors.slice(0, 3));
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();
