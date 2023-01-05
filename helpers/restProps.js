import hbs from "express-hbs"; 

export default function(options) {
  // console.log("options : ", options);
  return Object.entries(options).reduce((acc, [key, value]) => typeof value !== "object" && value ? acc + hbs.SafeString(`${key}=${value}`) : "", "");
}