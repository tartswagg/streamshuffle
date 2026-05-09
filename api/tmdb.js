export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { path, ...params } = req.query;
  const url = new URL(`https://api.themoviedb.org/3/${path}`);
  url.searchParams.set('api_key', process.env.TMDB_KEY);
  url.searchParams.set('language', 'fr-FR');
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const response = await fetch(url.toString());
  const data = await response.json();
  res.status(200).json(data);
}
