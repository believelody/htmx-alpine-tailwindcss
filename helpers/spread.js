export default function(context) {
  const result = Object.entries(context).filter(([key, value]) => typeof value !== "object" && value).map(([key, value]) => {
    return `${key}="${value}"`
  }).join(" ");
  return result;
}