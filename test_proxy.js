import https from 'https';

const url = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=waka_cec9d646-871e-4ab8-bfdb-bd26807d7302');

const req = https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log('Response:', data.substring(0, 300)));
});
req.end();
