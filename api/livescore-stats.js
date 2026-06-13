const LIVE_SCORE_STATS_BASE = "https://www.livescore.com/en/football/international/world-cup-2026/stats";

async function fetchStatGroup(group) {
  const response = await fetch(`${LIVE_SCORE_STATS_BASE}/${group}/`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; WC26Wallpaper/1.0)"
    }
  });

  if (!response.ok) {
    throw new Error(`LiveScore ${group} ${response.status}`);
  }

  const html = await response.text();
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);

  if (!match) {
    throw new Error(`LiveScore ${group} missing data`);
  }

  const data = JSON.parse(match[1]);
  const players = data?.props?.pageProps?.initialData?.stats?.players;

  if (!Array.isArray(players)) {
    throw new Error(`LiveScore ${group} invalid payload`);
  }

  return players;
}

export default async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Cache-Control", "s-maxage=120, stale-while-revalidate=300");

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  try {
    const [goals, assists, shots] = await Promise.all([
      fetchStatGroup("goals"),
      fetchStatGroup("assist"),
      fetchStatGroup("shots")
    ]);

    response.status(200).json({
      source: "LiveScore",
      updatedAt: new Date().toISOString(),
      goals,
      assists,
      shots
    });
  } catch (error) {
    response.status(500).json({
      error: String(error.message || error)
    });
  }
}
