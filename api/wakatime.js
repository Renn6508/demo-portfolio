export default async function handler(request, response) {
  const apiKey = 'waka_15a56351-657d-4b2b-903d-49c23d15fb55';
  
  try {
    const res = await fetch(`https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=${apiKey}`);

    if (!res.ok) {
      throw new Error(`WakaTime API returned ${res.status}`);
    }

    const data = await res.json();
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
