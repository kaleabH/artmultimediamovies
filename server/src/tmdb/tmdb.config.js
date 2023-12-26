const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;
const getUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);
  console.log("api", endpoint, params);
  console.log(`${baseUrl}${endpoint}?api_key=${key}&${qs}`);

  return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
};

export default { getUrl };
