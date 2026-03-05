export default async function handler(request, response) {
  const apiKey = 'waka_cec9d646-871e-4ab8-bfdb-bd26807d7302';
  
  try {
    const res = await fetch('https://wakatime.com/api/v1/users/current/stats/last_7_days', {
      headers: {
        'Authorization': `Basic ${Buffer.from(apiKey).toString('base64')}`
      }
    });

    if (!res.ok) {
      throw new Error(`WakaTime API returned ${res.status}`);
    }

    const data = await res.json();
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
