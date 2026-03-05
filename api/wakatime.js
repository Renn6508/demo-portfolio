export default async function handler(request, response) {
  const apiKey = 'waka_3bb68930-d951-481e-961e-e1506a95ffbf';
  
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
