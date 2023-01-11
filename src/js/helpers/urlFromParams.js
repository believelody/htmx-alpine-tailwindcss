export default function(baseUrl, { hash }) {
  console.log(hash);
  let url = new URL(baseUrl);
  Object.entries(hash).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  return url;
}